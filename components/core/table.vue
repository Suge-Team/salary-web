<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.value"
                  scope="col"
                  class="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 pl-2"
                >
                  <template v-if="header.sortable">
                    <div class="group inline-flex cursor-pointer" @click.prevent="toggleSort(header.value)">
                      {{ header.text }}
                      <span
                        class="ml-2 flex-none rounded"
                        :class="
                          !sortOrder || sortBy !== header.value
                            ? 'invisible text-gray-400 group-hover:visible group-focus:visible'
                            : 'bg-gray-200 text-gray-900 group-hover:bg-gray-300'
                        "
                      >
                        <ChevronUpIcon v-if="sortOrder === SortOrder.ASC" class="h-5 w-5" aria-hidden="true" />
                        <ChevronDownIcon v-else class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                  </template>
                  <template v-else>
                    {{ header.text }}
                  </template>
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr v-for="(item, index) in items" :key="index">
                <td
                  v-for="header in headers"
                  :key="header.value"
                  class="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
                >
                  <slot :name="header.value" :item="item" :index="index">{{ item[header.value] }}</slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({ headers: Array, items: Array });

const emits = defineEmits(["sortChanged"]);

const sortBy = ref(null);
const sortOrder = ref(null);

function toggleSort(column) {
  if (sortBy.value !== column) {
    sortBy.value = column;
    sortOrder.value = SortOrder.DESC;
  } else if (sortOrder.value === SortOrder.DESC) {
    sortOrder.value = SortOrder.ASC;
  } else {
    sortBy.value = null;
    sortOrder.value = null;
  }

  emits("sortChanged", { sortBy: sortBy.value, sortOrder: sortOrder.value });
}
</script>
