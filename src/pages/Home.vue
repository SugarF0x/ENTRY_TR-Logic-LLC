<template>
  <div class="home">
    <h1>This is home page</h1>
    <p>some text</p>
    <Sticker data></Sticker>
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
    }
  }
</script>

<style lang="less" scoped>

</style>