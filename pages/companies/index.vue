<template>
  <div>
    <!-- Heading -->
    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-2xl font-medium text-gray-900">Danh sách công ty</h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <nuxt-link
          to="/salaries"
          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Nhập lương của bạn
        </nuxt-link>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-row gap-4 mb-4">
      <core-text-field v-model="searchQuery" class="basis-1/4" label="Công ty" placeholder="FPT, LINE, etc" />
      <core-select v-model="selectedRole" class="basis-1/4" label="Vị trí" :items="roleItems" />
    </div>

    <!-- Salary table -->
    <core-table :headers="companyHeaders" :items="companyItems" @sort-changed="updateSort">
      <template #company="{ item }">
        <nuxt-link class="font-bold text-indigo-600" :to="`/companies/${item.id}`">{{ item.company }}</nuxt-link>
      </template>

      <template #median="{ item }">
        {{ formatCurrency(item.median) }}
      </template>

      <template #min="{ item }">
        {{ formatCurrency(item.min) }}
      </template>
      <template #max="{ item }">
        {{ formatCurrency(item.max) }}
      </template>
      <template #top10="{ item }">
        {{ formatCurrency(item.top10) }}
      </template>
    </core-table>
  </div>
</template>

<script setup>
const companyHeaders = [
  {
    text: "Công ty",
    value: "company",
    sortable: true,
  },
  {
    text: "Lương năm",
    value: "median",
    sortable: true,
  },
  {
    text: "Thấp nhất",
    value: "min",
    sortable: true,
  },
  {
    text: "Cao nhất",
    value: "max",
    sortable: true,
  },
  {
    text: "Top 10%",
    value: "top10",
    sortable: true,
  },
  {
    text: "Số lượt đăng",
    value: "dataCount",
    sortable: true,
  },
];

const companyItems = [
  {
    id: 1,
    company: "FPT",
    median: 100000000,
    min: 50000000,
    max: 200000000,
    top10: 150000000,
    dataCount: 10,
  },
];

const roleItems = [
  {
    id: 0,
    text: "Tất cả",
  },
  {
    id: 1,
    text: "Software Engineer",
  },
  {
    id: 2,
    text: "Engineering Manager",
  },
];

const searchQuery = ref("");
const selectedRole = ref(roleItems[0]);
const sortBy = ref(null);
const sortOrder = ref(null);

const queryParams = computed(() => {
  return {
    searchQuery: searchQuery.value || undefined,
    role: selectedRole.value.id,
    sortBy: sortBy.value || undefined,
    sortOrder: sortOrder.value || undefined,
  };
});

watch(queryParams, () => {
  console.log(queryParams.value);
});

function updateSort({ sortBy, sortOrder }) {
  sortBy.value = sortBy;
  sortOrder.value = sortOrder;
}
</script>
