<template>
  <div class="sticker">
    <h3>{{ sticker.title }}</h3>
    <ul>
      <li v-for="task in sticker.tasks">
        <label>
          <input type="checkbox" :checked="task.state" disabled>
          {{ task.text }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
  /**
   * Sticker component containing TODOs' titles, checkboxes and whatnot
   *
   * @category client
   * @subcategory components
   * @namespace sticker
   */
  export default {
    name: "Sticker",
    props: {
      sticker: {
        type: Object,
        default: () => {
          return {
            title: 'Default title',
            tasks: [
              {
                state: false,
                text: 'Default checkbox 1'
              },{
                state: false,
                text: 'Default checkbox 2'
              },{
                state: false,
                text: 'Default checkbox 3'
              }
            ]
          }
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
    ul {
      padding-left: 0;
    }
  }
</style>