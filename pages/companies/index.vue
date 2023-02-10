<template>
  <div>
    <!-- Heading -->
    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-2xl font-medium text-gray-900">Danh sách công ty</h3>
    </div>

    <!-- Filters -->
    <div class="flex flex-row gap-4 mb-4">
      <core-text-field v-model="searchQuery" class="basis-1/4" label="Công ty" placeholder="FPT, LINE, etc" />
    </div>

    <!-- Salary table -->
    <core-table
      :headers="companyHeaders"
      :items="companies"
      :initial-sort-by="sortBy"
      :initial-sort-order="sortOrder"
      @sort-changed="updateSort"
    >
      <template #name="{ item }">
        <nuxt-link class="text-primary" :to="`/companies/${item.id}`">{{ item.name }}</nuxt-link>
      </template>

      <template #compensationMedian="{ item }">
        {{ formatMillion(item.compensationMedian) }}
      </template>

      <template #compensationMin="{ item }">
        {{ formatMillion(item.compensationMin) }}
      </template>

      <template #compensationMax="{ item }">
        {{ formatMillion(item.compensationMax) }}
      </template>
    </core-table>
  </div>
</template>

<script setup>
const companyHeaders = [
  {
    text: "Công ty",
    value: "name",
    sortable: true,
  },
  {
    text: "Lương năm median",
    value: "compensationMedian",
    sortable: true,
  },
  {
    text: "Thấp nhất",
    value: "compensationMin",
    sortable: true,
  },
  {
    text: "Cao nhất",
    value: "compensationMax",
    sortable: true,
  },
  {
    text: "Số lượt đăng",
    value: "compensationCount",
    sortable: true,
  },
];

const searchQuery = ref("");
const sortBy = ref("name");
const sortOrder = ref(SortOrder.ASC);

const allCompanies = await fetchAllCompanies();
const companies = ref(sortAndFilterCompanies(allCompanies));

const queryParams = computed(() => {
  return {
    searchQuery: searchQuery.value || undefined,
    sortBy: sortBy.value || undefined,
    sortOrder: sortOrder.value || undefined,
  };
});

watch(queryParams, () => {
  companies.value = sortAndFilterCompanies(allCompanies);
});

function updateSort(sort) {
  sortBy.value = sort.sortBy;
  sortOrder.value = sort.sortOrder;
}

function sortAndFilterCompanies(allCompanies) {
  let queryResult = allCompanies;
  if (searchQuery.value) {
    queryResult = allCompanies.filter((company) => {
      return company.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  }

  if (sortBy.value) {
    queryResult = sortCollection(queryResult, sortBy.value, sortOrder.value);
  }

  return queryResult;
}
</script>
