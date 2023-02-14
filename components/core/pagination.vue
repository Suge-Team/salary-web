<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-3 py-3">
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        :class="{ 'text-gray-200 pointer-events-none': currentPage === 1 }"
        @click.prevent="currentPage > 1 && $emit('change-page', currentPage - 1)"
      >
        Trang trước
      </a>
      <a
        href="#"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        :class="{ 'text-gray-200 pointer-events-none': currentPage === totalPage }"
        @click.prevent="currentPage < totalPage && emits('change-page', currentPage + 1)"
      >
        Trang sau
      </a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Hiển thị
          {{ " " }}
          <span class="font-medium">{{ start }}</span>
          {{ " " }}
          -
          {{ " " }}
          <span class="font-medium">{{ end }}</span>
          {{ " " }}
          /
          {{ " " }}
          <span class="font-medium">{{ total }}</span>
          {{ " " }}
          kết quả
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a
            href="#"
            class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            :class="{ 'text-gray-200 pointer-events-none': currentPage === 1 }"
            @click.prevent="currentPage > 1 && $emit('change-page', currentPage - 1)"
          >
            <span class="sr-only">Trang trước</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>

          <!-- Current: "z-10 bg-indigo-50 border-primary-lighter text-primary", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <template v-for="(page, index) in pages">
            <span
              v-if="page === '...'"
              :key="page + index"
              class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
              >...</span
            >
            <a
              v-else-if="page === currentPage"
              :key="page + 'active'"
              href="#"
              aria-current="page"
              class="relative z-10 inline-flex items-center border border-primary-lighter bg-indigo-50 px-4 py-2 text-sm font-medium text-primary focus:z-20"
              >{{ page }}</a
            >
            <a
              v-else
              :key="page"
              href="#"
              class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              @click.prevent="emits('change-page', page)"
              >{{ page }}</a
            >
          </template>

          <a
            href="#"
            class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            :class="{ 'text-gray-200 pointer-events-none': currentPage === totalPage }"
            @click.prevent="currentPage < totalPage && emits('change-page', currentPage + 1)"
          >
            <span class="sr-only">Trang sau</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const totalPage = computed(() => {
  return Math.ceil(props.total / props.perPage);
});

const pages = computed(() => {
  if (totalPage.value <= 7) {
    return Array.from({ length: totalPage.value }, (_, i) => i + 1);
  }

  const currentPage = props.currentPage;

  if (currentPage < 3 || currentPage > totalPage.value - 2) {
    return [1, 2, 3, "...", totalPage.value - 2, totalPage.value - 1, totalPage.value];
  }

  if (currentPage === 3) {
    return [1, 2, 3, 4, "...", totalPage.value - 1, totalPage.value];
  }

  if (currentPage === totalPage.value - 2) {
    return [1, 2, "...", totalPage.value - 3, totalPage.value - 2, totalPage.value - 1, totalPage.value];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage.value];
});

const start = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1;
});

const end = computed(() => {
  return Math.min(props.total, start.value + props.perPage - 1);
});

const emits = defineEmits(["change-page"]);
</script>
