<template>
    <div v-if="loading" class="loading-container">
      <ProgressSpinner />
    </div>
  </template>
  
  <script setup>
  import ProgressSpinner from "primevue/progressspinner";
  defineProps({
    loading: Boolean,
  });
  </script>
  
  <style scoped>
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* Adjust as needed */
  }
  </style>
  