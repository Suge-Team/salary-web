<template>
  <div>
    <!-- Heading -->
    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-2xl font-medium text-gray-900">Danh sách công ty</h3>
    </div>

    <!-- Filters -->
    <div class="flex flex-row gap-4 mb-4">
      <core-text-field v-model="searchQuery" class="basis-full sm:basis-2/5" placeholder="FPT, VNG, v.v" />
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
        <dl class="font-normal sm:hidden">
          <dd class="mt-1 truncate text-gray-700">{{ item.compensationCount }} lượt đăng</dd>
        </dl>
      </template>

      <template #compensationMedian="{ item }">
        <b>{{ formatMillion(item.compensationMedian) }}</b>
        <dl class="font-normal sm:hidden">
          <dd class="mt-1 truncate text-gray-700">Thấp nhất: {{ formatMillion(item.compensationMin) }}</dd>
          <dd class="mt-1 truncate text-gray-700">Cao nhất: {{ formatMillion(item.compensationMax) }}</dd>
        </dl>
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
    hiddenOnMobile: true,
  },
  {
    text: "Cao nhất",
    value: "compensationMax",
    sortable: true,
    hiddenOnMobile: true,
  },
  {
    text: "Số lượt đăng",
    value: "compensationCount",
    sortable: true,
    hiddenOnMobile: true,
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

const metaTitle = "Tiền lương trung bình của kỹ sư IT, CNTT ở các công ty tại Việt Nam - Lương Tháng";
const metaDescription = `Danh sách các công ty và thống kê mức lương năm median, mức lương thấp nhất, mức lương cao nhất `;

useHead({
  title: "Tiền lương trung bình của kỹ sư IT, CNTT ở các công ty tại Việt Nam - Lương Tháng",
  meta: [
    {
      hid: "description",
      name: "description",
      content: metaDescription,
    },
    { property: "og:title", content: metaTitle },
    {
      property: "og:description",
      content: metaDescription,
    },
    { property: "twitter:title", content: metaTitle },
    {
      property: "twitter:description",
      content: metaDescription,
    },
  ],
})
</script>
