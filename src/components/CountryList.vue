<script setup lang="ts">
  import type { CountryIntf } from '@/interfaces';
  import CountryCard from './CountryCard.vue';

  defineProps<{
    countries: CountryIntf[];
  }>();
</script>

<template>
  <ul class="country-list">
    <li v-for="country of countries" :key="country.name.common">
      <CountryCard :country="country"/>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  @use '@/assets/scss/mixins';
  .country-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    padding: 2rem 2.5rem 4rem;
    gap: 2.5rem;

    @include mixins.md {
      padding: 3rem 1rem 4rem;
    }
    @include mixins.lg {
      padding-inline: 0;
      gap: 4.625rem;
    }
  }
</style>