<script setup lang="ts">
import CountryList from '@/components/CountryList.vue';
import type {
  CountryFiltersIntf,
  CountryFiltersUpdateIntf,
} from '@/interfaces';
import { computed, reactive } from 'vue';
import { useTitle } from '@vueuse/core';
import CountryFiltersSection from '../components/CountryFiltersSection.vue';
import { useCountries } from '@/composables/countries';
import Loader from '../components/Loader.vue';

useTitle('Frontend Mentor | REST Countries API');

const { countries, isLoaded } = useCountries();

const filters = reactive<CountryFiltersIntf>({
  search: '',
  region: 'all',
});

function updateFilters(filterUpdate: CountryFiltersUpdateIntf) {
  if (filterUpdate.search !== undefined) {
    filters.search = filterUpdate.search;
  } else if (filterUpdate.region) {
    filters.region = filterUpdate.region;
  }

  console.log(filters);
}
const filteredCountries = computed(() => countries.value.filter((country) => {
  const regionSearch = filters.region === 'all' ? country.region : filters.region === 'America' ? 'Americas' : filters.region;
  return country.name.common.toLowerCase().includes(filters.search.toLowerCase()) && country.region === regionSearch;
}).sort((a, b) => b.population - a.population));

</script>

<template>
  <div class="container">
    <Loader class="loader" v-if="!isLoaded"/>
    <template v-else>
      <CountryFiltersSection :filters="filters" @update-filters="updateFilters" />
      <CountryList :countries="filteredCountries" />
    </template>
  </div>
</template>
