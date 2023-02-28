<template>
  <div class="relative">
    <div @mouseenter="toggleTooltip()" @mouseleave="toggleTooltip()">
      <div ref="trigger">
        <slot />
      </div>
    </div>

    <div
      ref="tooltip"
      :class="{ hidden: !tooltipShow, block: tooltipShow }"
      class="tooltip z-50 w-max max-w-xs bg-white p-4 drop-shadow-lg text-left no-underline break-words rounded-lg whitespace-normal"
    >
      <slot name="content" />
      <div v-if="withArrow" class="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script setup>
import { createPopper } from "@popperjs/core";

const tooltipShow = ref(false);
const trigger = ref(null);
const tooltip = ref(null);

const props = defineProps({
  contentClass: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  placement: { type: String, default: "auto" },
  withArrow: { type: Boolean, default: false },
});

function toggleTooltip() {
  if (props.disabled) {
    return;
  }

  if (tooltipShow.value) {
    tooltipShow.value = false;
  } else {
    tooltipShow.value = true;
    createPopper(trigger.value, tooltip.value, {
      placement: props.placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 4],
          },
        },
      ],
    });
  }
}
</script>

<style scoped>
.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.arrow {
  visibility: hidden;
}

.arrow::before {
  visibility: visible;
  content: "";
  transform: rotate(45deg);
}

.tooltip[data-popper-placement^="top"] > .arrow {
  bottom: -4px;
}

.tooltip[data-popper-placement^="bottom"] > .arrow {
  top: -4px;
}

.tooltip[data-popper-placement^="left"] > .arrow {
  right: -4px;
}

.tooltip[data-popper-placement^="right"] > .arrow {
  left: -4px;
}
</style>
