<script setup lang="ts">
  import type { CountryIntf } from '@/interfaces';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
import LeftArrowIcon from '../components/icons/LeftArrowIcon.vue';

  const route = useRoute();

  const country: CountryIntf = (await axios.get('https://restcountries.com/v3.1/alpha/' + route.params.code)).data[0];
  console.log(country);
</script>

<template>
  <div class="country container">
    <RouterLink class="btn" to="/">
      <LeftArrowIcon />
      <span>Back</span>
    </RouterLink>

    <div class="country__flag-container">
      <img :src="country.flags.svg" alt="">
    </div>
    <div class="country__details">
      <h2 class="country__name">{{ country.name.common }}</h2>
      <dl class="country__details__geography">
        <div class="country__detail"><dt>Native Name:</dt> <dd>{{ country.name.nativeName }}</dd></div>
        <div class="country__detail"><dt>Population:</dt> <dd>{{ country.population.toLocaleString('en-GB') }}</dd></div>
        <div class="country__detail"><dt>Region:</dt> <dd>{{ country.region }}</dd></div>
        <div class="country__detail"><dt>Sub Region:</dt> <dd>{{ country.subregion }}</dd></div>
        <div class="country__detail"><dt>Capital:</dt> <dd>{{ Array.isArray(country.capital) ? country.capital[0] : '?' }}</dd></div>
      </dl>
      <dl class="country__details__other">
        <div class="country__detail"><dt>Top Level Domain:</dt> <dd>{{ country.tld }}</dd></div>
        <div class="country__detail"><dt>Currencies:</dt> <dd>{{ country.population }}</dd></div>
        <div class="country__detail"><dt>Languages:</dt> <dd>{{ country.region }}</dd></div>
      </dl>
      <div class="country__borders">
        <h3>Border Countries:</h3>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .country {
    padding-inline: 0.75rem;

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 300;
      line-height: 1.45;
      background-color: var(--color-foreground);
      border-radius: 2px;
      padding: 0.375rem 1.5rem;
      margin-top: 2.5rem;
      margin-bottom: 4rem;
      box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);

      svg {
        width: 18px;
      }
    }

    &__flag-container {
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 2.75rem;
    }

    &__name {
      margin-bottom: 1rem;
    }

    &__details__geography {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__details__other {
      padding-block: 3rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__detail {
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