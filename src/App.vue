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
    name: 'App'
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
  }
</style>
