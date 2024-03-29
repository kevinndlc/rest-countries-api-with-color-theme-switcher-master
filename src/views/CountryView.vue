<script setup lang="ts">
import type { CountryIntf } from '@/interfaces';
import { useTitle } from '@vueuse/core';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import LeftArrowIcon from '../components/icons/LeftArrowIcon.vue';
import { useCountries } from '@/composables/countries';
import { onUpdated, ref, watchEffect, type Ref } from 'vue';
import Loader from '../components/Loader.vue';

const route = useRoute();

const { countries, isLoaded } = useCountries();
const country = ref<CountryIntf | undefined>(undefined);
const countryCurrencies = ref('');
const countryNativeName = ref('');
const countryLanguages = ref('');
const countryBorders: Ref<CountryIntf[] | undefined> = ref(undefined);

interface currencyIntf {
  name: string;
  symbol: string;
}

interface countryNameIntf {
  official: string;
  common: string;
}

function getCountryInfo() {
  country.value = countries.value.find(
    (c: CountryIntf) =>
      c.cca3.toLowerCase() === (route.params.code as string).toLowerCase()
  );

  if (country.value) {
    useTitle(`${country.value.name.common} | REST Countries API`);

    countryCurrencies.value = Object.values(country.value.currencies)
      .map((currency) => (currency as currencyIntf).name)
      .join(', ');
    countryLanguages.value = Object.values(country.value.languages).sort((a, b) => (a as string).localeCompare(b as string)).join(', ')

    const countryNativeNames = Object.values(country.value.name.nativeName).map(
      (name) => (name as countryNameIntf).common
    );
    countryNativeName.value = countryNativeNames[countryNativeNames.length - 1];

    if (country.value.borders) {
      countryBorders.value = countries.value
        .filter((c) => country.value!.borders!.join(',').includes(c.cca3))
        .sort((a, b) => a.name.common.localeCompare(b.name.common));
    }
  } else {
    useTitle('Unknown Country | REST Countries API');
  }
}

const unwatch = watchEffect(() => {
  if (isLoaded.value) {
    getCountryInfo();
  }
});

onUpdated(() => {
  scroll(0, 0);
});

onBeforeRouteLeave(unwatch);
</script>

<template>
  <div class="country container">
    <RouterLink class="btn" to="/"> <LeftArrowIcon /> Back </RouterLink>

    <Loader v-if="!isLoaded" />
    <h2 v-else-if="!country" class="country__unknown">
      This country doesn't exist in our database.
    </h2>
    <template v-else>
      <div class="grid">
        <div class="country__flag-container">
          <img :src="country.flags.svg" alt="" />
        </div>
        <div class="country__details">
          <h2 class="country__name">{{ country.name.common }}</h2>
          <div class="country__details-container">
            <dl class="country__details__geography">
              <div class="country__detail">
                <dt>Native Name:</dt>
                <dd>{{ countryNativeName }}</dd>
              </div>
              <div class="country__detail">
                <dt>Population:</dt>
                <dd>{{ country.population.toLocaleString('en-GB') }}</dd>
              </div>
              <div class="country__detail">
                <dt>Region:</dt>
                <dd>{{ country.region }}</dd>
              </div>
              <div class="country__detail">
                <dt>Sub Region:</dt>
                <dd>{{ country.subregion }}</dd>
              </div>
              <div class="country__detail">
                <dt>Capital:</dt>
                <dd>
                  {{ Array.isArray(country.capital) ? country.capital[0] : '?' }}
                </dd>
              </div>
            </dl>
            <dl class="country__details__other">
              <div class="country__detail">
                <dt>Top Level Domain:</dt>
                <dd>{{ country.tld[0] }}</dd>
              </div>
              <div class="country__detail">
                <dt>Currencies:</dt>
                <dd>{{ countryCurrencies }}</dd>
              </div>
              <div class="country__detail">
                <dt>Languages:</dt>
                <dd>{{ countryLanguages }}</dd>
              </div>
            </dl>
          </div>
          <div v-if="country.borders" class="country__borders">
            <h3 class="country__borders-title">Border Countries:</h3>
            <ul class="country__borders-list">
              <li v-for="border of countryBorders">
                <RouterLink :to="'/country/' + border.cca3.toLowerCase()">
                  {{ border.name.common }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins';
.country {
  padding-inline: 0.75rem;
  padding-bottom: 4rem;

  @include mixins.md {
    padding-inline: 0;
  }

  .grid {
    @include mixins.lg {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: clamp(5rem, 20vw - 7rem, 9rem);
      align-items: center;
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.25rem;
    background-color: var(--color-foreground);
    border-radius: 2px;
    padding-inline: 1.5rem;
    padding-top: 7px;
    padding-bottom: 5px;
    margin-top: 2.5rem;
    margin-bottom: 4rem;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);

    @include mixins.md {
      font-size: 1rem;
      gap: 0.625rem;
      border-radius: 6px;
      padding-top: 11px;
      padding-bottom: 9px;
      padding-left: 2rem;
      padding-right: 39px;
    }
    @include mixins.lg {
      margin-block: 5rem;
    }

    svg {
      width: 18px;
      aspect-ratio: 1;

      @include mixins.md {
        width: 20px;
      }
    }
  }

  &__flag-container {
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 2.75rem;

    @include mixins.lg {
      margin-bottom: 0;
    }
  }

  &__name {
    margin-bottom: 1rem;
    font-size: 1.375rem;
    line-height: 1.35;

    @include mixins.md {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  }

  &__details-container {
    @include mixins.md {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }

  &__details__geography div,
  &__details__other div {
    line-height: 2rem;
  }

  &__details__other {
    margin-block: 2rem;

    @include mixins.md {
      margin-block: 0;
    }
  }

  &__detail {
    font-size: 0.875rem;

    @include mixins.md {
      font-size: 1rem;
    }

    dt {
      font-weight: 600;
      display: inline;
      margin-right: 0.75ch;
    }

    dd {
      display: inline;
      font-weight: 300;
    }
  }

  &__borders {
    @include mixins.md {
      margin-top: 4.25rem;
    }

    &-title {
      font-size: 1rem;
      line-height: 1.5;
    }

    &-list {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.625rem;
      align-items: center;

      li {
        flex-basis: 96px;
      }

      a {
        background-color: var(--color-foreground);
        box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.104931);
        display: inline-block;
        border-radius: 2px;
        padding-top: 7px;
        padding-bottom: 5px;
        width: 100%;
        text-align: center;
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 300;

        @include mixins.md {
          font-size: 0.875rem;
          padding-top: 5px;
          padding-bottom: 3px;
        }
      }
    }
  }
}

html.dark {
  .country__borders-list a {
    box-shadow: 0px 0px 4px 1px rgba(17, 21, 23, 0.25);
  }
}
</style>
