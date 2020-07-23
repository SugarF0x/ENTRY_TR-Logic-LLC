<template>
  <div class="edit">
    <div v-if="id === 'new'">
      <h1>Create new TODO list</h1>
      <Sticker edit/>
    </div>
    <div v-else>
      <div v-if="sticker">
        <h1>This is an edit page</h1>
        <h2>Here you can edit sticker #{{ id }}</h2>
        <Sticker :sticker="sticker" edit/>
      </div>
      <div v-else>
        <h2>This TODO list does not exist!</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import Sticker from '../components/Sticker';

  /**
   * Edit page where all the magic happens
   *
   * @category client
   * @subcategory pages
   * @namespace edit
   */
  export default {
    name: 'Edit',
    components: {
      Sticker
    },
    data() {
      return {
        id: this.$route.params.id
      }
    },
    computed: {
      sticker() {
        if (this.$store.state.stickers.length > 0) {
          let stickers = this.$store.state.stickers;
          stickers = stickers.filter(el => {return el.id === this.id});
          if (stickers.length)
            return stickers[0];
        }
        return false;
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
