<template>
  <div class="sticker">
    <Dialog :display="dialog.destroy"
            message="Are you sure you want to delete this list?"
            @proceed="toDestroy"
    />
    <Dialog :display="dialog.discard"
            message="Are you sure you want to discard changes?"
            @proceed="toDiscard"
    />

    <!-- DISPLAY MODE -->
    <div v-if="!edit">
      <button class="destroy"
              @click="dialog.destroy = true"
              title="Delete instance"
      >
        X
      </button>
      <h3>
        {{ sticker.title }}
      </h3>
      <ul>
        <li v-for="(task, index) in sticker.tasks"
            :key="index"
            v-if="index < 3"
        >
          <label>
            <input type="checkbox"
                   :checked="task.state"
                   disabled
            >
            {{ task.text }}
          </label>
        </li>
      </ul>
      <div v-if="sticker.tasks.length > 3"
           style="text-align: center"
      >
        <small>
          +{{ sticker.tasks.length - 3 }} more
        </small>
      </div>
      <button class="edit"
              @click="modify"
      >
        Edit
      </button>
    </div>

    <!-- EDIT MODE -->
    <div v-else>
      <button class="destroy"
              @click="dialog.destroy = true"
              title="Delete instance"
      >
        X
      </button>
      <label style="display: flex">
        <input placeholder="title"
               v-model="newData.title"
               style="flex: 1 0 auto;"
               :class="{ modified: isModified(-1) }"
        >
        <button class="discard"
                @click="undo(-1)"
                :disabled="!isModified(-1)"
                v-if="!revertData.title"
                title="Discard"
        >
          <
        </button>
        <button class="discard"
                @click="revert(-1)"
                v-else
                title="Revert discard"
        >
          >
        </button>
      </label>
      <ul>
        <li v-for="(v,i) in newData.tasks">
          <label v-if="v.exists">
            <input type="checkbox"
                   v-model="v.state"
            >
            <input placeholder="task"
                   v-model="v.text"
                   :class="{ modified: isModified(i) }"
            >
            <button class="discard"
                    @click="discardTask(i)"
            >
              X
            </button>
            <button class="discard"
                    @click="undo(i)"
                    :disabled="!isModified(i)"
                    v-if="!revertData.tasks[i]"
                    title="Discard"
            >
              <
            </button>
            <button class="discard"
                    @click="revert(i)"
                    v-else
                    title="Revert discard"
            >
              >
            </button>
          </label>
          <div v-else
               style="text-align: center; margin: .5rem 0;"
          >
            <span style="color: red">Deleted</span>
            <button @click="v.exists = true" style="margin: 0 0 0 .5rem">restore</button>
          </div>
        </li>
        <li style="text-align: center;">
          <button @click="addTask">
            Add task
          </button>
        </li>
      </ul>
      <div class="actions">
        <button @click="dialog.discard=true">
          Discard
        </button>
        <button @click="update">
          Accept
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Dialog from './Dialog';

  /**
   * Sticker component containing TODOs' titles, checkboxes and whatnot
   *
   * @category client
   * @subcategory components
   * @namespace sticker
   *
   * @vue-prop {Object}   sticker               - Sticker data objects
   * @vue-prop {String}   sticker.title         - Sticker title
   * @vue-prop {String}   sticker.id            - Sticker id
   * @vue-prop {Object[]} sticker.tasks         - Tasks object container
   * @vue-prop {Boolean}  sticker.tasks[].state - Task checkbox state
   * @vue-prop {String}   sticker.tasks[].text  - Task text
   * @vue-prop {Boolean}  edit - Directs sticker editability
   *
   * @vue-data {Object}   dialog         - Dialog states container object
   * @vue-data {Boolean}  dialog.destroy - Directs visibility of sticker deletion dialog window
   * @vue-data {Boolean}  dialog.discard - Directs visibility of changes discard dialog window
   * @vue-data {Object}   newData                - New data objects container
   * @vue-data {String}   newData.title          - New sticker title
   * @vue-data {String}   newData.id             - New sticker id
   * @vue-data {Object[]} newData.tasks          - New tasks object container
   * @vue-data {Boolean}  newData.tasks[].state  - New task checkbox state
   * @vue-data {String}   newData.tasks[].text   - New task text
   * @vue-data {Boolean}  newData.tasks[].exists - Directs deletion/recovery of tasks
   * @vue-data {Object}   revertData       - Backup data storage object used for undoing changes
   * @vue-data {String}   revertData.title - Backup sticker title
   * @vue-data {String}   revertData.id    - Backup sticker id
   * @vue-data {Object[]} revertData.tasks - Backup tasks object container
   *
   * @vue-event {Void} addTask()             - Create new task list item
   * @vue-event {Void} discardTask({Number}) - Mark specified task list item for deletion
   * @vue-event {Void} modify()              - Move over to this sticker's edit page
   * @vue-event {Void} destroy()             - Delete this sticker from storage
   * @vue-event {Void} update()              - Update storage with this sticker's new data and return home
   * @vue-event {Void} toDestroy({Boolean})  - Prompt confirmation for this sticker's deletion
   * @vue-event {Void} toDiscard({Boolean})  - Prompt confirmation for this sticker's new data discard
   * @vue-event {Void} isModified({Number})  - Compare new sticker data with it's storage
   * @vue-event {Void} undo({Number})        - Undo changes made to the field while retaining it's data
   * @vue-event {Void} revert({Number})      - Apply data saved from undoing changes
   */
  export default {
    name: "Sticker",
    components: {
      Dialog
    },
    props: {
      sticker: {
        type: Object,
        default: () => {
          return {
            title: '',
            id: Math.floor(Math.random()*1000000).toString(),
            tasks: [
              {
                state: false,
                text: ''
              }
            ]
          }
        }
      },
      edit: Boolean
    },
    data() {
      return {
        dialog: {
          destroy: false,
          discard: false
        },
        newData: {
          title: this.sticker.title,
          id:    this.sticker.id,
          tasks: this.sticker.tasks.map(entry => {
            return {
              state:  entry.state,
              text:   entry.text,
              exists: true
            }
          })
        },
        revertData: {
          title: '',
          id:    '',
          tasks: []
        }
      }
    },
    methods: {
      addTask() {
        this.newData.tasks.push({state: false, text: '', exists: true})
      },
      discardTask(index) {
        this.newData.tasks[index].exists = false;
      },
      modify() {
        this.$router.push('/' + this.sticker.id);
      },
      destroy() {
        this.$store.commit('setStickers', this.$store.state.stickers.filter(el => {
          return el.id !== this.sticker.id;
        }));
      },
      update() {
        let finalData = JSON.parse(JSON.stringify(this.newData));
        finalData.tasks = finalData.tasks.map( entry => {
          if (entry.exists) {
            delete entry.exists;
            return entry;
          }
        }).filter( entry => {
          return entry !== undefined;
        });

        let store = JSON.parse(JSON.stringify(this.$store.state.stickers));
        if (store.filter(entry => {
          return entry.id === finalData.id;
        }).length)
          store = this.$store.state.stickers.map(entry => {
            if (entry.id === finalData.id)
              return finalData;
            else
              return entry;
          });
        else
          store.push(finalData);

        this.$store.commit('setStickers', store);
        this.$router.push('/');
      },
      toDestroy(val) {
        this.dialog.destroy = false;
        if (val) {
          this.destroy();
          if (this.$router.currentRoute.name !== 'Home')
            this.$router.push('/')
        }
      },
      toDiscard(val) {
        this.dialog.discard = false;
        if (val) {
          this.newData = {
            title: this.sticker.title,
            id:    this.sticker.id,
            tasks: this.sticker.tasks.map(entry => {
              return {
                state:  entry.state,
                text:   entry.text,
                exists: true
              }
            })
          };
          this.revertData = {
            title: '',
            id:    '',
            tasks: []
          };
        }
      },
      isModified(index) {
        if (this.sticker.title === '')
          return false;
        else

        if (index === -1)
          return this.sticker.title !== this.newData.title;
        else if (index < this.sticker.tasks.length)
          return (this.sticker.tasks[index].text  !== this.newData.tasks[index].text
               || this.sticker.tasks[index].state !== this.newData.tasks[index].state);
        else
          return false;
      },
      undo(index) {
        if (index === -1) {
          this.revertData.title = this.newData.title;
          this.newData.title    = this.sticker.title;
        }
        else {
          this.revertData.tasks[index]        = {};
          this.revertData.tasks[index].text   = this.newData.tasks[index].text;
          this.revertData.tasks[index].state  = this.newData.tasks[index].state;

          this.newData.tasks[index].text  = this.sticker.tasks[index].text;
          this.newData.tasks[index].state = this.sticker.tasks[index].state || false;
        }
      },
      revert(index) {
        if (index === -1) {
          this.newData.title = this.revertData.title;
          this.revertData.title = '';
        }
        else {
          this.newData.tasks[index].text  = this.revertData.tasks[index].text;
          this.newData.tasks[index].state = this.revertData.tasks[index].state;
          delete this.revertData.tasks[index];
          this.revertData.tasks = this.revertData.tasks.filter(entry => {
            return entry !== undefined;
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .sticker {
    background-color: blanchedalmond;
    border-radius: 1rem;
    padding: 1rem;
    margin: 1rem;
    display: inline-block;
    min-width: 10rem;
    max-width: 90vw;
    text-align: left;
    position: relative;
    .actions {
      display: flex;
      justify-content: space-between;
    }
    .discard {
      margin: 0;
      padding: .3rem;
    }
    .edit {
      width: 100%;
    }
    .destroy {
      position: absolute;
      top: -1.5rem;
      right: -0.5rem;
      height: 2rem;
      width: 2rem;
      cursor: pointer;
      border-radius: 1rem;
      border: .1rem solid white;
    }
    .modified {
      border-color: yellowgreen;
      background-color: rgba(250,250,250,.5);
    }
    button {
      margin-top: 1rem;
    }
    ul {
      padding-left: 0;
      margin-bottom: 0;
      li {
        margin: .1rem 0;
      }
    }
    h3 {
      margin-top: 0;
    }
    input {
      padding: .3rem;
    }
    input[type="checkbox"] {
      margin-right: .8rem;
    }
  }
</style>