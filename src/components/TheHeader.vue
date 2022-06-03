<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core';
import IconMoonPlain from './icons/IconMoonPlain.vue';
import IconMoonOutline from './icons/IconMoonOutline.vue';

  const isDark = useDark();
  const toggleDark = useToggle(isDark);
</script>

<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">Where in the world?</h1>
      <button class="dark-mode-toggle" @click="toggleDark()">
        <IconMoonPlain v-if="isDark" />
        <IconMoonOutline v-else />
        <span>Dark Mode</span>
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
  @use '@/assets/scss/mixins';

  .header {
    background-color: var(--color-foreground);
    padding-block: 1.875rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      font-size: 0.875rem;
      font-size: clamp(0.875rem, 0.6rem + 1.4vw, 1.5rem);
    }

    .dark-mode-toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      font-size: 0.75rem;
      line-height: 1.3;

      @include mixins.md {
        font-size: 1rem;
      }

      svg {
        width: 1rem;
        aspect-ratio: 1;

        @include mixins.md {
          width: 1.25rem;
        }
      }
    }
  }

  html.dark .header {
    box-shadow: none;
  }
</style>