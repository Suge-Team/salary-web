<template>
  <CoreTooltip :disabled="!shouldShowTooltip" placement="left-end">
    <InformationCircleIcon v-if="shouldShowTooltip" class="h-5 w-5 text-primary" aria-hidden="true" />

    <template #content>
      <div v-if="item.bonusMemo">
        <h4 class="font-medium text-gray-900">Thưởng</h4>
        <div class="text-gray-500 mt-1">
          {{ item.bonusMemo }}
        </div>
      </div>
      <div v-if="item.otherBenefits" :class="{ 'mt-2': item.bonusMemo }">
        <h4 class="font-medium text-gray-900">Phúc lợi khác</h4>
        <div class="text-gray-500 mt-1">{{ item.otherBenefits }}</div>
      </div>
      <div v-if="item.signingBonus" :class="{ 'mt-2': item.otherBenefits }">
        <h4 class="font-medium text-gray-900">Signing bonus</h4>
        <div class="text-gray-500 mt-1">{{ item.signingBonus }} tr</div>
      </div>
    </template>
  </CoreTooltip>
</template>

<script setup>
import { InformationCircleIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const shouldShowTooltip = computed(() => props.item.bonusMemo || props.item.otherBenefits || props.item.signingBonus);
</script>
