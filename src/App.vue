<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <TheHeader />

  <main class="main">
    <RouterView />
  </main>
</template>

<style>
@import '@/assets/scss/base.scss';
@import '@/assets/scss/utilities.scss';
</style>
