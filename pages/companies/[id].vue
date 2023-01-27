<template>
  <div>
    <!-- Heading -->
    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-2xl font-medium text-gray-900">{{ company.name }}</h3>
      <div class="mt-3 sm:mt-0 sm:ml-4"></div>
    </div>

    <core-stat-card :item-count="5">
      <core-stat-item>
        <template #title>Lương trung bình</template>
        <template #text>{{ getMillions(company.median) }}</template>
        <template #subText>triệu</template>
      </core-stat-item>

      <core-stat-item>
        <template #title>Thấp nhất</template>
        <template #text>{{ getMillions(company.min) }}</template>
        <template #subText>triệu</template>
      </core-stat-item>

      <core-stat-item>
        <template #title>Cao nhất</template>
        <template #text>{{ getMillions(company.max) }}</template>
        <template #subText>triệu</template>
      </core-stat-item>

      <core-stat-item>
        <template #title>YoE trung bình</template>
        <template #text>{{ company.averageYoe }}</template>
        <template #subText>năm</template>
      </core-stat-item>

      <core-stat-item>
        <template #title>Số lượt đăng</template>
        <template #text>{{ company.dataCount }}</template>
      </core-stat-item>
    </core-stat-card>

    <!-- Salary table -->
    <core-table :headers="salaryHeaders" :items="salaryItems" class="mt-4" @sort-changed="updateSort">
      <template #company="{ item }">
        <span class="font-bold">{{ item.company }}</span>
      </template>

      <template #tc="{ item }">
        {{ formatCurrency(item.tc) }}
      </template>

      <template #postedAt="{ item }">
        {{ formatDate(item.postedAt) }}
      </template>
    </core-table>
  </div>
</template>

<script setup>
const company = {
  name: "FPT",
  median: 100000000,
  min: 50000000,
  max: 100000000,
  dataCount: 100,
  averageYoe: 5.2,
};

const salaryHeaders = [
  {
    text: "Công ty",
    value: "company",
  },
  {
    text: "Vị trí",
    value: "role",
  },
  {
    text: "Số năm kinh nghiệm",
    value: "yoe",
  },
  {
    text: "Lương năm",
    value: "tc",
    sortable: true,
  },
  {
    text: "Ngày đăng",
    value: "postedAt",
  },
];

const salaryItems = [
  {
    company: "FPT",
    role: "Backend Engineer",
    yoe: 5,
    tc: 100000000,
    postedAt: "2023-01-05T16:06:00.362Z",
  },
  {
    company: "Vina Game",
    role: "Backend Engineer",
    yoe: 4,
    tc: 200000000,
    postedAt: "2023-01-05T16:06:00.362Z",
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

const focusItems = [
  {
    id: 0,
    text: "Tất cả",
  },
  {
    id: 1,
    text: "Backend",
  },
  {
    id: 2,
    text: "Frontend",
  },
];

const stats = [
  { name: "Lương trung bình", median: "100" },
  { name: "Top 10%", median: "200" },
  { name: "Top 50%", median: "100" },
  { name: "Top 90%", median: "75" },
];

const sortBy = ref(null);
const sortOrder = ref(null);

const queryParams = computed(() => {
  return {
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
