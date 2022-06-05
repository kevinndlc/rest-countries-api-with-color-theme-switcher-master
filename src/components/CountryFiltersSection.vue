<script setup lang="ts">
  import type { CountryFiltersIntf, CountryFiltersUpdateIntf } from "@/interfaces";
  import CountrySearchBar from '@/components/CountrySearchBar.vue';
import CountryRegionFilter from './CountryRegionFilter.vue';
  
  defineProps<{
    filters: CountryFiltersIntf;
  }>()

  const emit = defineEmits<{
    (e: 'updateFilters', filters: CountryFiltersUpdateIntf): void;
  }>()
</script>

<template>
  <div class="filters-wrapper">
    <CountrySearchBar class="search-bar" :search="filters.search" @update-search="emit('updateFilters', { search: $event })" />
    <CountryRegionFilter class="filter" :region="filters.region" @update-region="emit('updateFilters', { region: $event })" />
  </div>
</template>

<style scoped lang="scss">
  @use '@/assets/scss/mixins';

  .filters-wrapper {
    margin-top: 1.5rem;

    @include mixins.md {
      margin-top: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }
  }

  .search-bar {
    @include mixins.md {
      flex-basis: 30rem;
    }
  }

  .filter {
    margin-top: 2.5rem;

    @include mixins.md {
      margin-top: 0;
    }
  }
</style>