<template>
  <Listbox :model-value="modelValue" as="div" @update:model-value="$emit('update:modelValue', $event)">
    <div class="flex">
      <ListboxLabel v-if="!!label" class="block text-sm font-medium text-gray-700">{{ label }}</ListboxLabel>
      <span v-if="optional" id="email-optional" class="text-sm text-gray-500 ml-2">không bắt buộc</span>
    </div>
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-lighter focus:outline-none focus:ring-1 focus:ring-primary-lighter sm:text-sm"
        :class="
          invalid &&
          'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
        "
      >
        <span v-if="modelValue" class="block truncate">{{ modelValue.text }}</span>
        <!-- Fix a bug that the select height will not be calculated correctly if we provide no selection content initially -->
        <span v-else class="block truncate invisible">Dummy</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption v-for="item in items" :key="item.id" v-slot="{ active, selected }" as="template" :value="item">
            <li
              :class="[
                active ? 'text-white bg-primary' : 'text-gray-900',
                'relative cursor-pointer select-none py-2 pl-3 pr-9',
              ]"
            >
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ item.text }}</span>

              <span
                v-if="selected"
                :class="[active ? 'text-white' : 'text-primary', 'absolute inset-y-0 right-0 flex items-center pr-4']"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  label: String,
  modelValue: Object,
  items: {
    type: Array,
    default: () => [],
  },
  invalid: Boolean,
  optional: Boolean,
});

const emits = defineEmits(["update:modelValue"]);
</script>
