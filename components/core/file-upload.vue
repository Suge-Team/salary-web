<template>
  <div>
    <div class="flex">
      <label v-if="!!label" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <span v-if="optional" :id="name" class="text-sm text-gray-500 ml-2">không bắt buộc</span>
    </div>

    <div class="mt-1 relative">
      <input
        :id="name"
        type="file"
        :name="name"
        :accept="accept"
        class="block w-full min-w-0 flex-auto cursor-pointer rounded-md border shadow-sm border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
        :class="{
          'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500':
            !!invalid,
          'no-appearance': !!noAppearance,
        }"
        @input="$emit('update:modelValue', $event)"
        @focus="$emit('focus')"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  name: String,
  accept: String,
  refValue: String,
  optional: {
    type: Boolean,
    default: false,
  },
  invalid: Boolean,
  noAppearance: Boolean,
});

const emits = defineEmits(["update:modelValue", "focus"]);
</script>

<style scoped>
.no-appearance::-webkit-inner-spin-button,
.no-appearance::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
}
</style>
