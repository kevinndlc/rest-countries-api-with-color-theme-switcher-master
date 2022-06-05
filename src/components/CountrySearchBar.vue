<script setup lang="ts">
  import SearchIcon from './icons/SearchIcon.vue';

  defineProps<{
    search: string;
  }>();

  const emit = defineEmits<{
    (e: 'updateSearch', search: string): void;
  }>();
</script>

<template>
  <form class="country__search-bar" @submit.prevent="">
    <input
      :value="search"
      @input="emit('updateSearch', ($event.target as HTMLInputElement).value)"
      type="text"
      placeholder="Search for a country..."
    />
    <SearchIcon />
  </form>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins';

.country__search-bar {
  background-color: var(--color-foreground);
  border-radius: 5px;
  position: relative;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.05);
  color: hsl(0, 0%, 52%);

  input {
    background-color: transparent;
    border: none;
    width: 100%;
    font-size: 0.75rem;
    line-height: 1.25rem;
    padding-block: 0.875rem;
    padding-left: 4.625rem;

    @include mixins.md {
      font-size: 0.875rem;
      padding-block: 1.125rem;
    }

    &::placeholder {
      color: inherit;
    }
  }

  svg {
    width: 1rem;
    position: absolute;
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);

    @include mixins.md {
      width: 1.125rem;
    }
  }
}

html.dark form {
  color: inherit;
}
</style>
