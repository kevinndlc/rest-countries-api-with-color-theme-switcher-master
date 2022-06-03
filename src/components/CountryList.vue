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
  .country-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
    padding: 2rem 2.5rem 65px;
    gap: 2.5rem;
  }
</style>