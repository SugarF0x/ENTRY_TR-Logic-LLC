<template>
  <div class="home">
    <h1>Home</h1>
    <router-link to="/new">
      Add new task
    </router-link>
    <div v-if="stickers.length"
         class="sticker-box"
    >
      <Sticker v-for="sticker in stickers"
               :key="sticker.title"
               :sticker="sticker"
      />
    </div>
    <div v-else>
      <h2>Looks like you dont have anything to do yet!</h2>
    </div>
  </div>
</template>

<script>
  import Sticker from '../components/Sticker.vue'

  /**
   * Home page displaying all the Stickers
   *
   * @category client
   * @subcategory pages
   * @namespace home
   *
   * @vue-computed {Object[]} stickers() - Get stickers from storage
   */
  export default {
    name: 'Home',
    components: {
      Sticker
    },
    computed: {
      stickers() {
        return this.$store.state.stickers;
      }
    }
  }
</script>

<style lang="less" scoped>
  .sticker-box {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }
  a {
    color: inherit;
    text-decoration: inherit;
    font-weight: bold;
    padding: 1rem;
    display: inline-block;
    background-color: whitesmoke;
    border-radius: 1rem;
  }
  a:hover {
    background-color: #eaeaea;
  }
</style>