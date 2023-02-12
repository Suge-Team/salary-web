<template>
  <Combobox v-model="selectedItem" as="div">
    <div v-if="label" class="flex">
      <ComboboxLabel class="block text-sm font-medium text-gray-700">{{ label }}</ComboboxLabel>
      <span v-if="optional" id="email-optional" class="text-sm text-gray-500 ml-2">không bắt buộc</span>
    </div>

    <div class="relative" :class="{ 'mt-1': !!label }">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <slot name="icon" />
      </div>

      <ComboboxInput
        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary-lighter focus:outline-none focus:ring-1 focus:ring-primary-lighter sm:text-sm"
        :class="{
          'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500':
            invalid,
          'pl-10': !!$slots.icon,
        }"
        :display-value="(item) => item"
        :placeholder="placeholder"
        @change="updateQuery"
        @focus="$emit('focus')"
      />

      <ComboboxOptions
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption v-if="customItem" :value="customItem" as="template">
          <div />
        </ComboboxOption>

        <ComboboxOption v-for="item in filteredItems" :key="item" v-slot="{ active }" :value="item" as="template">
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-primary text-white' : 'text-gray-900',
            ]"
          >
            <span class="block truncate">
              {{ item }}
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup>
import { computed, ref } from "vue";
import { Combobox, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from "@headlessui/vue";

const props = defineProps({
  label: String,
  modelValue: String,
  items: {
    type: Array,
    default: () => [],
  },
  optional: {
    type: Boolean,
    default: false,
  },
  placeholder: { type: String, default: "" },
  invalid: Boolean,
});

const emits = defineEmits(["update:modelValue", "focus"]);

const query = ref("");
const selectedItem = ref(null);

const filteredItems = computed(() =>
  !!query.value
    ? props.items.filter((item) => {
        return item.toLowerCase().includes(query.value.toLowerCase());
      })
    : []
);

const customItem = computed(() => (query.value && filteredItems.value.length === 0 ? query.value : null));

function updateQuery(event) {
  query.value = event.target.value;

  if (!query.value) {
    // Emit will be done by the `selectedItem` watcher
    selectedItem.value = null;
  } else {
    emits("update:modelValue", query.value);
  }
}

watch(selectedItem, () => {
  emits("update:modelValue", selectedItem.value);
});
</script>
