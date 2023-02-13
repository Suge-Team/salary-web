<template>
  <dl
    :class="`grid sm:divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow grid-cols-2 sm:grid-cols-${itemCount} md:divide-y-0 md:divide-x`"
  >
    <slot />
  </dl>
</template>

<script setup>
const props = defineProps({
  itemCount: {
    type: Number,
    default: 5,
  },
});
</script>
