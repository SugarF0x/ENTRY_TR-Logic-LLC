<template>
  <div class="sticker">
    <Dialog :display="dialog.destroy"
            @proceed="toDestroy"
    />
    <Dialog :display="dialog.discard"
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
      <label>
        <input placeholder="title"
               v-model="newData.title"
               style="width: 100%;"
               :class="{ modified: isModified(-1) }"
        >
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
          </label>
          <div v-else
               style="text-align: center; margin: .5rem 0;"
          >
            Deleted. Restore?
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
            id: Math.floor(Math.random()*100000).toString(),
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
        }
      },
      isModified(index) {
        if (this.sticker.title === '')
          return false;
        else

        if (index === -1)
          return this.sticker.title !== this.newData.title;
        else if (index < this.sticker.tasks.length)
          return this.sticker.tasks[index].text !== this.newData.tasks[index].text;
        else
          return false;
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
      border-color: yellow;
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