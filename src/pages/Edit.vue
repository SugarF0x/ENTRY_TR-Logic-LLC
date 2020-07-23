<template>
  <div class="edit">
    <h1>This is an edit page</h1>
    <h3>Here you can edit sticker #{{ id }}</h3>
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
        id: this.$route.params.id
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
