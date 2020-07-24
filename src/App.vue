<template>
  <div id="app">
    <div id="nav">
      <h1>
          <router-link to="/" class="cyan">TODO</router-link>
        list for
          <span class="cyan">TR Logic LLC</span>
        by
          <span class="cyan">Sugar_F0x</span>
      </h1>
      <button @click="fillDummyData">Fill dummy data</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
  /**
   * The cradle of this project
   *
   * @category client
   * @subcategory root
   * @namespace app
   */
  export default {
    name: 'App',
    data() {
      return {
        dummyData: [
          {
            title: 'Dummy title 1',
            id: '1',
            tasks: [
              {
                state: false,
                text:  'Dummy checkbox 1'
              },
              {
                state: false,
                text:  'Dummy checkbox 2'
              },
              {
                state: false,
                text:  'Dummy checkbox 3'
              }
            ]
          },{
            title: 'Dummy title 2',
            id: '2',
            tasks: [
              {
                state: false,
                text:  'Other dummy title 1'
              },
              {
                state: false,
                text:  'Dummy checkbox 27'
              },
              {
                state: false,
                text:  'Checkbox of other length'
              }
            ]
          },{
            title: 'ASD asdafasdfasdf',
            id: '3',
            tasks: [
              {
                state: false,
                text:  'asdfasdfsdafasdg'
              },
              {
                state: false,
                text:  'sdg'
              },
              {
                state: false,
                text:  'asdasdfasg'
              },
              {
                state: false,
                text:  'Hidden checkbox 1'
              },
              {
                state: false,
                text:  'Hidden checkbox 2'
              },
              {
                state: false,
                text:  'Hidden checkbox 3'
              }
            ]
          },
        ]
      }
    },
    methods: {
      fillDummyData() {
        this.$store.commit('setStickers', this.dummyData)
      }
    }
  }
</script>

<style lang="less">
  @import './assets/global.css';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center; // this one centers it all !CAUTION!
    color: #2c3e50;
  }

  #nav {
    padding: 1rem;
    background-color: steelblue;
    color: white;
    .cyan {
      color: cyan;
    }
    button {
      position: fixed;
      top: 1rem;
      right: 1rem;
    }
  }
</style>
