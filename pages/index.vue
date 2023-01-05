<template>
  <div>
    <!-- Hot companies -->
    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-2xl font-medium text-gray-900">Công ty hot</h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <nuxt-link
          to="/companies"
          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Xem tất cả
        </nuxt-link>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="company in hotCompanies"
        :key="company.name"
        class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
      >
        <div class="min-w-0 flex-1">
          <a href="#" class="focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true" />
            <h4 class="text-lg font-medium text-gray-900">{{ company.name }}</h4>
            <p class="truncate text-sm text-gray-500">Lương năm trung bình: {{ company.median }}</p>
            <p class="truncate text-sm text-gray-500">Số lượt đăng: {{ company.dataCount }}</p>
          </a>
        </div>
      </div>
    </div>

    <!-- New posts -->
    <div class="pb-5 sm:flex sm:items-center sm:justify-between mt-8">
      <h3 class="text-2xl font-medium text-gray-900">Lương mới nhập</h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <nuxt-link
          to="/salaries"
          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Xem tất cả
        </nuxt-link>
      </div>
    </div>

    <core-table :headers="salaryHeaders" :items="salaryItems">
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
const hotCompanies = [];
for (let i = 0; i < 10; i++) {
  hotCompanies.push({
    name: `Company #${i}`,
    median: formatCurrency(100_000_000 + Math.ceil(Math.random() * 100) * 1_000_000),
    dataCount: Math.ceil(Math.random() * 100),
  });
}

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
    tc: 100_000_000,
    postedAt: "2023-01-05T16:06:00.362Z",
  },
  {
    company: "Vina Game",
    role: "Backend Engineer",
    yoe: 4,
    tc: 200_000_000,
    postedAt: "2023-01-05T16:06:00.362Z",
  },
];
</script>
