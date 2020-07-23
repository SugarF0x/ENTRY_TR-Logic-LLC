<template>
  <div class="edit">
    <h1>This is an edit page</h1>
    <h3>Here you can edit sticker #{{ sticker }}</h3>
  </div>
</template>

<script>
  /**
   * Edit page where all the magic happens
   *
   * @category client
   * @subcategory pages
   * @namespace edit
   */
  export default {
    name: 'Edit',
    data() {
      return {
        sticker: this.$route.params.sticker
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
