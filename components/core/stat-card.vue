<template>
  <dl
    :class="`grid divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow grid-cols-${itemCount} md:divide-y-0 md:divide-x`"
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
