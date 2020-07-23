<template>
  <div class="home">
    <h1>This is home page</h1>
    <p>some text</p>
    <Sticker v-for="sticker in stickers"
             :key="sticker.title"
             :sticker="sticker"
    />
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

</style>