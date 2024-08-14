<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <main>
      <button class="close-button" @click="close">&times;</button>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
 position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    box-sizing: border-box;
}

.modal {
   box-sizing: border-box;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    max-height: 100%;
    position: relative;
    overflow-y: auto;
}

.close-button {
   position: absolute;
    top: 20px;
    right: 25px;
    background: none;
    border: none;
    font-size: 2.5em;
    cursor: pointer;
}
</style>