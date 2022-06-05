<script setup lang="ts">
  import type { CountryIntf } from '@/interfaces';
  import { RouterLink } from 'vue-router';

  defineProps<{
    country: CountryIntf;
  }>()
</script>

<template>
  <RouterLink :to="'/country/' + country.cca3.toLowerCase()">
    <div class="country card">
    <img class="country__flag" :src="country.flags.svg" :alt="country.name.common + ' flag'">
  
    <div class="country__inner">
      <h2 class="country__name">{{ country.name.common }}</h2>
      <dl class="country__infos">
        <div class="country__info"><dt>Population:</dt> <dd>{{ country.population.toLocaleString('en-GB') }}</dd></div>
        <div class="country__info"><dt>Region:</dt> <dd>{{ country.region }}</dd></div>
        <div class="country__info"><dt>Capital:</dt> <dd>{{ Array.isArray(country.capital) ? country.capital[0] : '?' }}</dd></div>
      </dl>
    </div>
  </div>
  </RouterLink>
</template>

<style scoped lang="scss">
  .country {
    height: 100%;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    &__flag {
      width: 100%;
      height: 160px;
      object-fit: cover;
      box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.03);
    }

    &__inner {
      padding: 1.5rem;
      padding-bottom: 2.875rem;
    }

    &__name {
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }

    &__infos {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    &__info {
      font-size: 0.875rem;
      font-weight: 300;
      line-height: 1rem;

      dt {
        font-weight: 600;
        display: inline;
      }

      dd {
        display: inline;
      }
    }
  }
</style>