<template>
  <div>
    <label v-if="!!label" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1">
      <input
        :id="name"
        :type="type"
        :name="name"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
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
});

const emits = defineEmits(["update:modelValue"]);
</script>
