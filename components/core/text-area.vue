<template>
  <div>
    <div class="flex justify-between">
      <label v-if="!!label" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <span v-if="optional" id="email-optional" class="text-sm text-gray-500">Không bắt buộc</span>
    </div>

    <div class="mt-1">
      <textarea
        :id="name"
        :name="name"
        rows="4"
        :placeholder="placeholder"
        :value="modelValue"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  name: String,
  placeholder: { type: String, default: "" },
  modelValue: [String, Number],
  optional: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>
