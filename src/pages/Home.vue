<template>
  <div class="home">
    <h1>Home</h1>
    <router-link to="/new">
      Add new task
    </router-link>
    <div v-if="stickers.length">
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
  /**
   * Home page displaying all the Stickers
   *
   * @category client
   * @subcategory pages
   * @namespace home
   */
  import Sticker from '../components/Sticker.vue'

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