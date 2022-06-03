<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <TheHeader />

  <main class="main">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <Component :is="Component" />
        </Suspense>
      </template>
    </RouterView>
  </main>
</template>

<style>
@import '@/assets/scss/base.scss';
@import '@/assets/scss/utilities.scss';
</style>
