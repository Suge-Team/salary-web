<template>
  <Combobox v-model="selectedItem" as="div">
    <div class="flex justify-between">
      <ComboboxLabel v-if="label" class="block text-sm font-medium text-gray-700">{{ label }}</ComboboxLabel>
      <span v-if="optional" id="email-optional" class="text-sm text-gray-500">Không bắt buộc</span>
    </div>

    <div class="relative mt-1">
      <ComboboxInput
        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        :display-value="(item) => item"
        @change="updateQuery"
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
              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
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
});

const emits = defineEmits(["update:modelValue"]);

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
