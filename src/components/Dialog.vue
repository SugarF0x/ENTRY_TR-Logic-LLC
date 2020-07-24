<template>
  <div class="wrapper" v-if="display">
    <div class="card">
      <h3>{{ message }}</h3>
      <div class="actions">
        <button @click="abort">Abort</button>
        <button @click="proceed">Proceed</button>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * Dialog prompt to confirm actions
   *
   * @category client
   * @subcategory components
   * @namespace checkbox.dialog
   */
  export default {
    name: "Dialog",
    props: {
      display: Boolean,
      message: String
    },
    methods: {
      abort() {
        this.$emit('proceed', false)
      },
      proceed() {
        this.$emit('proceed', true)
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrapper {
    z-index: 1000;
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    .card {
      padding: 1rem;
      border-radius: 1rem;
      background-color: white;
      .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>