<template>
  <div class="sticker">
    <Dialog :display="dialog" @proceed="proceed"></Dialog>

    <!-- DISPLAY MODE -->
    <div v-if="!edit">
      <button class="destroy"
              @click="dialog = true"
              title="Delete instance"
      >X</button>
      <h3>{{ sticker.title }}</h3>
      <ul>
        <li v-for="(task, index) in sticker.tasks"
            :key="index"
            v-if="index < 3"
        >
          <label>
            <input type="checkbox" :checked="task.state" disabled>
            {{ task.text }}
          </label>
        </li>
      </ul>
      <small v-if="sticker.tasks.length > 3">
        More...
      </small>
      <button class="edit" @click="modify">Edit</button>
    </div>

    <!-- EDIT MODE -->
    <div v-else>
      <button class="destroy"
              @click="dialog = true"
              title="Delete instance"
      >X</button>
      <label>
        <input placeholder="title" v-model="sticker.title" style="width: 100%;">
      </label>
      <ul>
        <li v-for="(v,i) in sticker.tasks">
          <label>
            <input type="checkbox" :checked="v.state">
            <input placeholder="task" v-model="v.text">
          </label>
          <button class="discard" @click="discardTask(i)">X</button>
        </li>
        <li>
          <button @click="addTask">Add task</button>
        </li>
      </ul>
      <div class="actions">
        <button>Discard</button>
        <button>Accept</button>
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
            id: null,
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
        dialog: false
      }
    },
    methods: {
      addTask() {
        this.sticker.tasks.push({state: false, text: ''})
      },
      discardTask(index) {
        delete this.sticker.tasks[index];
        this.sticker.tasks = this.sticker.tasks.filter( el => {
          return el !== undefined
        });
      },
      modify() {
        this.$router.push('/' + this.sticker.id);
      },
      destroy() {
        this.$store.commit('setStickers', this.$store.state.stickers.filter(el => {
          return el.id !== this.sticker.id;
        }));
      },
      create() {

      },
      proceed(val) {
        this.dialog = false;
        if (val) {
          this.destroy()
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
    text-align: left;
    position: relative;
    .actions {
      display: flex;
      justify-content: space-between;
    }
    .discard {
      margin: 0 0 0 .5rem;
    }
    .edit {
      width: 100%;
    }
    .destroy {
      position: absolute;
      top: -0.7rem;
      right: .5rem;
      border-radius: 1rem;
      font-size: 50%;
    }
    button {
      margin-top: 1rem;
    }
    ul {
      padding-left: 0;
      margin-bottom: 0;
      li {
        text-align: center;
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