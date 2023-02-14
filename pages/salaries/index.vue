<template>
  <div>
    <!-- Heading -->
    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-2xl font-medium text-gray-900">Tham khảo lương</h3>
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
    <div class="flex flex-row flex-wrap sm:flex-nowrap gap-4 mb-4 mt-8">
      <core-text-field
        v-model="searchQuery"
        class="basis-full sm:basis-1/5 grow"
        label="Công ty"
        placeholder="FPT, VNG, v.v"
      />
      <core-select v-model="selectedCategory" class="basis-1/5 grow" label="Phân loại" :items="categoryItems" />
      <core-select v-model="selectedFocus" class="basis-1/5 grow" label="Chuyên môn" :items="focusItems" />
      <core-text-field
        v-model.number="yoe"
        class="hidden sm:inline-block basis-1/5 grow"
        label="Số năm kinh nghiệm"
        type="number"
      />
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
          <dl class="font-normal sm:hidden">
            <dd class="mt-1 truncate text-gray-700">{{ item.jobTitle }}</dd>
            <dd class="mt-1 truncate text-gray-500">{{ item.yearOfExperience }} YoE</dd>
          </dl>
        </div>
      </template>

      <template #jobTitle="{ item }">
        <div class="max-w-[150px] text-ellipsis overflow-hidden">{{ item.jobTitle }}</div>
      </template>

      <template #jobFocus="{ item }">
        {{ jobFocusesMap[item.jobFocus] || item.jobFocus || "-" }}
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
        <dl class="font-normal sm:hidden">
          <dd class="mt-1 truncate text-gray-500">
            Tháng: <b>{{ formatMillion(item.monthlyBaseSalary) }}</b>
          </dd>
          <dd class="mt-1 truncate text-gray-500">
            Thưởng: <b>{{ formatMillion(item.annualExpectedBonus) }}</b>
          </dd>
        </dl>
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
    text: "Chức danh",
    value: "jobTitle",
    sortable: true,
    hiddenOnMobile: true,
  },
  {
    text: "Chuyên môn",
    value: "jobFocus",
    sortable: true,
    hiddenOnMobile: true,
  },
  {
    text: "Năm kinh nghiệm",
    value: "yearOfExperience",
    sortable: true,
    hiddenOnMobile: true,
  },
  {
    text: "Lương tháng",
    value: "monthlyBaseSalary",
    sortable: true,
    hiddenOnMobile: true,
  },
  {
    text: "Thưởng năm",
    value: "annualExpectedBonus",
    sortable: true,
    hiddenOnMobile: true,
  },
  {
    text: "Tổng lương năm",
    value: "totalCompensation",
    sortable: true,
  },
  {
    text: "Thời điểm",
    value: "yearOfReceivedCompensation",
    hiddenOnMobile: true,
  },
];

const compensationStats = await fetchCompensationStats();
const stats = [
  { name: "Trung bình năm", value: compensationStats.mean },
  { name: "Top 10%", value: compensationStats.tenPercents },
  { name: "Top 50%", value: compensationStats.fiftyPercents },
  { name: "Top 90%", value: compensationStats.ninetyPercents },
];

const allCompensations = await fetchAllCompensations();
const allOption = {
  id: "all",
  text: "Tất cả",
};

const categoryItems = [allOption, ...jobCategories];
const focusItems = [allOption, ...jobFocuses];

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

  if (selectedCategory.value?.id && selectedCategory.value.id !== "all") {
    queryResult = queryResult.filter((compensation) => {
      return compensation.jobCategory === selectedCategory.value.id;
    });
  }

  if (selectedFocus.value?.id && selectedFocus.value.id !== "all") {
    queryResult = queryResult.filter((compensation) => {
      return compensation.jobFocus === selectedFocus.value.id;
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
