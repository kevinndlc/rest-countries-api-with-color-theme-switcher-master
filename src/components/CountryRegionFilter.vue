<script setup lang="ts">
  import type { Region } from '@/interfaces';
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue';
  import { ref, watch } from 'vue';
  import BottomChevronIcon from './icons/BottomChevronIcon.vue';
  import TickIcon from './icons/TickIcon.vue';

  const props = defineProps<{
    region: Region;
  }>()

  const emit = defineEmits<{
    (e: 'updateRegion', region: Region): void;
  }>();

  const regions = ['all', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  const lastSelectedRegion = ref(props.region);
  const selectedRegion = ref(props.region);

  function emitUpdateRegion() {
    if (selectedRegion.value === lastSelectedRegion.value) {
      selectedRegion.value = 'all';
    }

    emit('updateRegion', selectedRegion.value)

    lastSelectedRegion.value = selectedRegion.value;
  }
</script>

<template>
  <div class="country__region-filter">
    <Listbox v-model="(selectedRegion)" @update:model-value="emitUpdateRegion">
      <ListboxButton
        >Filter by
        {{ selectedRegion === 'all' ? 'Region' : selectedRegion }}
        <BottomChevronIcon />
      </ListboxButton>
      <Transition>
        <ListboxOptions>
          <ListboxOption
            v-for="region in regions.filter((region) => region !== 'all')"
            v-slot="{ active, selected }"
            :value="region"
          >
            <div :class="{ active }">
              {{ region === 'all' ? 'Region' : region }} <TickIcon v-if="selected" />
            </div>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </Listbox>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins';
.country__region-filter {
  position: relative;
  width: max-content;

  button {
    background-color: var(--color-foreground);
    border-radius: 5px;
    width: 200px;
    padding: 0.875rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    line-height: 1.25rem;
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.05);

    @include mixins.md {
      font-size: 0.875rem;
      padding-block: 1.125rem;
    }

    svg {
      width: 10px;
      aspect-ratio: 1;

      @include mixins.md {
        width: 12px;
      }
    }
  }

  ul {
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    transform: translateY(100%);
    background-color: var(--color-foreground);
    border-radius: 5px;
    padding-block: 0.75rem;
    font-size: 0.75rem;
    z-index: 99;
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.05);

    @include mixins.md {
      font-size: 0.875rem;
    }
  }

  li div {
    padding: 0.25rem 1.5rem;
    cursor: pointer;
    line-height: 1rem;

    @include mixins.md {
      line-height: 1.25rem;
    }

    svg {
      display: inline-block;
      width: 1rem;
      position: relative;
      top: 0.25rem;
    }
  }

  li div.active {
    background-color: var(--color-background);
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(90%)!important;
}
</style>
