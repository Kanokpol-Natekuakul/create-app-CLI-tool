<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div class="app">
    <h1>🚀 {{projectName}}</h1>
    <p>Welcome to your new Vue project!</p>
    <div class="card">
      <button @click="count++">
        Count: {{ count }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
</style>
