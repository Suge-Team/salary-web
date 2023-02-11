<template>
  <div>
    <div class="flex">
      <label v-if="!!label" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <span v-if="optional" id="email-optional" class="text-sm text-gray-500 ml-2">không bắt buộc</span>
    </div>

    <div class="mt-1 relative">
      <input
        :id="name"
        :type="type"
        :name="name"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        :class="
          invalid &&
          'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
        "
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus')"
      />

      <div v-if="currencyUnit" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <span id="price-currency" class="text-gray-500 sm:text-sm">{{ currencyUnit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  type: { type: String, default: "text" },
  name: String,
  placeholder: { type: String, default: "" },
  modelValue: [String, Number],
  currencyUnit: String,
  optional: {
    type: Boolean,
    default: false,
  },
  invalid: Boolean,
});

const emits = defineEmits(["update:modelValue", "focus"]);
</script>
