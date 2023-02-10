<template>
  <div>
    <!-- Heading -->
    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-2xl font-medium text-gray-900">Tham khảo lương</h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <nuxt-link
          to="/salaries/submit"
          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Nhập lương của bạn
        </nuxt-link>
      </div>
    </div>

    <core-stat-card :item-count="stats.length">
      <core-stat-item v-for="item in stats" :key="item.name">
        <template #title>{{ item.name }}</template>
        <template #pre>
          <span class="font-medium text-gray-500">
            {{ item.name.includes("Top") ? ">" : "" }}
          </span>
        </template>
        <template #text>{{ item.value }}</template>
        <template #subText>triệu</template>
      </core-stat-item>
    </core-stat-card>

    <!-- Filters -->
    <div class="flex flex-row gap-4 mb-4 mt-8">
      <core-text-field v-model="searchQuery" class="basis-1/4" label="Công ty" placeholder="FPT, LINE, etc" />
      <core-select v-model="selectedCategory" class="basis-1/4" label="Vị trí" :items="categoryItems" />
      <core-select v-model="selectedFocus" class="basis-1/4" label="Mảng" :items="focusItems" />
      <core-text-field v-model.number="yoe" class="basis-1/4" label="Số năm kinh nghiệm" type="number" />
    </div>

    <!-- Salary table -->
    <core-table
      :headers="compensationHeaders"
      :items="compensations"
      :initial-sort-by="sortBy"
      :initial-sort-order="sortOrder"
      @sort-changed="updateSort"
    >
      <template #companyName="{ item }">
        <div class="max-w-[200px] text-ellipsis overflow-hidden">
          <nuxt-link :to="`/companies/${item.companyId}`" class="text-primary">{{ item.companyName }}</nuxt-link>
        </div>
      </template>

      <template #jobTitle="{ item }">
        <div class="max-w-[150px] text-ellipsis overflow-hidden">{{ item.jobTitle }}</div>
      </template>

      <template #monthlyBaseSalary="{ item }">
        <b>{{ formatMillion(item.monthlyBaseSalary) }}</b>
      </template>

      <template #annualExpectedBonus="{ item }">
        <span v-if="item.annualExpectedBonus > 0">
          <b>{{ formatMillion(item.annualExpectedBonus) }} </b>
        </span>
        <span v-else>-</span>
      </template>

      <template #totalCompensation="{ item }">
        <b>{{ formatMillion(item.totalCompensation) }}</b>
      </template>

      <template #createdAt="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>
    </core-table>
  </div>
</template>

<script setup>
const compensationHeaders = [
  {
    text: "Công ty",
    value: "companyName",
    sortable: true,
  },
  {
    text: "Vị trí",
    value: "jobTitle",
    sortable: true,
  },
  {
    text: "Phân loại",
    value: "jobCategory",
    sortable: true,
  },
  {
    text: "Năm kinh nghiệm",
    value: "yearOfExperience",
    sortable: true,
  },
  {
    text: "Lương tháng",
    value: "monthlyBaseSalary",
    sortable: true,
  },
  {
    text: "Thưởng theo năm",
    value: "annualExpectedBonus",
    sortable: true,
  },
  {
    text: "Tổng lương năm",
    value: "totalCompensation",
    sortable: true,
  },
  {
    text: "Ngày đăng",
    value: "createdAt",
  },
];

const compensationStats = await fetchCompensationStats();
const stats = [
  { name: "Lương trung bình", value: compensationStats.mean },
  { name: "Top 10%", value: compensationStats.tenPercents },
  { name: "Top 50%", value: compensationStats.fiftyPercents },
  { name: "Top 90%", value: compensationStats.ninetyPercents },
];

const allCompensations = await fetchAllCompensations();
const allOption = {
  id: 0,
  text: "Tất cả",
};

const categoryItems = computed(() => {
  const items = [allOption];

  const categories = new Set();
  allCompensations.forEach((compensation) => {
    compensation.jobCategory && categories.add(compensation.jobCategory);
  });

  categories.forEach((category) => {
    items.push({
      id: items.length,
      text: category,
    });
  });

  return items;
});

const focusItems = computed(() => {
  const items = [allOption];

  const focuses = new Set();
  allCompensations.forEach((compensation) => {
    compensation.jobFocus && focuses.add(compensation.jobFocus);
  });

  focuses.forEach((focus) => {
    items.push({
      id: items.length,
      text: focus,
    });
  });

  return items;
});

const searchQuery = ref("");
const selectedCategory = ref(allOption);
const selectedFocus = ref(allOption);
const yoe = ref(null);
const sortBy = ref("totalCompensation");
const sortOrder = ref(SortOrder.DESC);

const compensations = computed(() => {
  let queryResult = allCompensations;
  if (searchQuery.value) {
    queryResult = queryResult.filter((compensation) => {
      return compensation.companyName.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  }

  if (selectedCategory.value?.id) {
    queryResult = queryResult.filter((compensation) => {
      return compensation.jobCategory === selectedCategory.value.text;
    });
  }

  if (selectedFocus.value?.id) {
    queryResult = queryResult.filter((compensation) => {
      return compensation.jobFocus === selectedFocus.value.text;
    });
  }

  if (yoe.value !== null && yoe.value !== "") {
    queryResult = queryResult.filter((compensation) => {
      return compensation.yearOfExperience === yoe.value;
    });
  }

  if (sortBy.value) {
    queryResult = sortCollection(queryResult, sortBy.value, sortOrder.value);
  }

  return queryResult;
});

function updateSort(sort) {
  sortBy.value = sort.sortBy;
  sortOrder.value = sort.sortOrder;
}
</script>
