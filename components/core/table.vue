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
                  class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  {{ header.text }}
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
const props = defineProps(["headers", "items"]);
</script>
