import type { CountryIntf } from '@/interfaces';
import axios from 'axios';
import { ref } from 'vue';

const countries = ref<CountryIntf[]>([]);
const isLoaded = ref(false);
const errorMessage = ref('');

export function useCountries() {
  if (!isLoaded.value) {
    (async function () {
      try {
        countries.value = (
          await axios.get('https://restcountries.com/v3.1/all')
        ).data;
      } catch (error) {
        errorMessage.value = error as string;
      } finally {
        isLoaded.value = true;
      }
    })();
  }

  return { countries, isLoaded, errorMessage };
}
