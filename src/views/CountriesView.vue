<script setup lang="ts">
  import type { CountryIntf } from '@/interfaces';
  import axios from 'axios';
import { computed } from 'vue';
  import CountryList from '../components/CountryList.vue';

  const countries: CountryIntf[] = (await axios.get('https://restcountries.com/v3.1/all')).data;
  const germany = countries.find(country => country.name.common === 'Belgium')

  const sortedCountries = computed(() => countries.sort((a, b) => b.population - a.population))

  console.log(germany);

</script>

<template>
  <div class="container">
    <div class="top-bar">
      <h2>INPUT</h2>
      <h2>FILTER</h2>
    </div>
    
    <CountryList :countries="sortedCountries" />
  </div>
</template>

<style lang="scss" scoped>

</style>