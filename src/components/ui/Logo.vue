<template>
  <div class="logo">
    <div class="logo__vector"></div>
  </div>
</template>

<script setup>
// Логика не нужна
</script>

<style scoped>
.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 95.95px;
  height: 28.28px;
  left: 0px;
  top: 0px;
}

.logo__vector {
  width: 95.95px;
  height: 28.28px;
  background: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
}
</style>
