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
        v-for="company in popularCompanies"
        :key="company.name"
        class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
      >
        <div class="min-w-0 flex-1">
          <nuxt-link :to="`/companies/${company.id}`" class="focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true" />
            <h4 class="text-lg font-medium text-primary">{{ company.name }}</h4>
            <p class="truncate text-sm text-gray-500">
              Lương năm median: <b>{{ formatMillion(company.compensationMedian) }}</b>
            </p>
            <p class="truncate text-sm text-gray-500">
              Số lượt đăng: <b>{{ company.compensationCount }}</b>
            </p>
          </nuxt-link>
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

    <core-table :headers="compensationHeaders" :items="recentCompensations">
      <template #companyName="{ item }">
        <nuxt-link :to="`/companies/${item.companyId}`" class="text-primary">{{ item.companyName }}</nuxt-link>
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
const popularCompanies = await fetchPopularCompanies();
const recentCompensations = await fetchRecentCompensations();

const compensationHeaders = [
  {
    text: "Công ty",
    value: "companyName",
  },
  {
    text: "Vị trí",
    value: "jobTitle",
  },
  {
    text: "Phân loại",
    value: "jobCategory",
  },
  {
    text: "Năm kinh nghiệm",
    value: "yearOfExperience",
  },
  {
    text: "Lương tháng",
    value: "monthlyBaseSalary",
  },
  {
    text: "Thưởng theo năm",
    value: "annualExpectedBonus",
  },
  {
    text: "Tổng lương năm",
    value: "totalCompensation",
  },
  {
    text: "Ngày đăng",
    value: "createdAt",
  },
];
</script>
