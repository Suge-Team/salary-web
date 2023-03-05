<template>
  <div>
    <!-- Hot companies -->
    <div class="pb-5 flex items-center justify-between">
      <h3 class="text-2xl font-medium text-gray-900">Công ty hot</h3>
      <div class="my-auto ml-4">
        <nuxt-link
          to="/companies"
          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2"
        >
          Xem tất cả
        </nuxt-link>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="company in popularCompanies"
        :key="company.name"
        class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary-lighter focus-within:ring-offset-2 hover:border-gray-400"
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
    <div class="pb-5 flex items-center justify-between mt-8">
      <h3 class="text-2xl font-medium text-gray-900">Lương mới nhập</h3>
      <div class="my-auto ml-4">
        <nuxt-link
          to="/salaries"
          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2"
        >
          Xem tất cả
        </nuxt-link>
      </div>
    </div>

    <core-table :headers="compensationHeaders" :items="recentCompensations" hide-pagination>
      <template #companyName="{ item }">
        <nuxt-link :to="`/companies/${item.companySlug}`" class="text-primary">{{ item.companyName }}</nuxt-link>
        <dl class="font-normal sm:hidden">
          <dd class="mt-1 truncate text-gray-700">{{ item.jobTitle }}</dd>
          <dd class="mt-1 truncate text-gray-500">{{ item.yearOfExperience || "-" }} YoE</dd>
        </dl>
      </template>

      <template #jobFocus="{ item }">
        {{ jobFocusesMap[item.jobFocus] || item.jobFocus || "-" }}
      </template>

      <template #monthlyBaseSalary="{ item }">
        <b>{{ formatMillion(item.monthlyBaseSalary) }}</b>
      </template>

      <template #yearOfExperience="{ item }">
        {{ item.yearOfExperience || "-" }}
      </template>

      <template #annualExpectedBonus="{ item }">
        <span v-if="item.annualExpectedBonus > 0">
          <b>{{ formatMillion(item.annualExpectedBonus) }} </b>
        </span>
        <span v-else>-</span>
      </template>

      <template #totalCompensation="{ item }">
        <div class="flex space-x-0.5">
          <b>{{ formatMillion(item.totalCompensation) }}</b>
          <CheckBadgeIcon v-if="item.verified" class="h-5 w-5 text-green-600" aria-hidden="true" />
        </div>
        <dl class="font-normal sm:hidden">
          <dd class="mt-1 truncate text-gray-500">
            Tháng: <b>{{ formatMillion(item.monthlyBaseSalary) }}</b>
          </dd>
          <dd class="mt-1 truncate text-gray-500">
            Thưởng: <b>{{ formatMillion(item.annualExpectedBonus) }}</b>
          </dd>
        </dl>
      </template>

      <template #memo="{ item }">
        <SalaryTooltip :item="item" />
      </template>
    </core-table>

    <div class="flex justify-between border-t border-gray-200 bg-white px-3 py-3">
      <div />
      <nuxt-link
        to="/salaries"
        class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2"
      >
        Xem tất cả
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { CheckBadgeIcon } from "@heroicons/vue/24/outline";

const popularCompanies = await fetchPopularCompanies();
const recentCompensations = await fetchRecentCompensations();

const compensationHeaders = [
  {
    text: "Công ty",
    value: "companyName",
  },
  {
    text: "Chức danh",
    value: "jobTitle",
    hiddenOnMobile: true,
  },
  {
    text: "Chuyên môn",
    value: "jobFocus",
    hiddenOnMobile: true,
  },
  {
    text: "Năm kinh nghiệm",
    value: "yearOfExperience",
    hiddenOnMobile: true,
  },
  {
    text: "Lương tháng",
    value: "monthlyBaseSalary",
    hiddenOnMobile: true,
  },
  {
    text: "Thưởng theo năm",
    value: "annualExpectedBonus",
    hiddenOnMobile: true,
  },
  {
    text: "Tổng lương năm",
    value: "totalCompensation",
  },
  {
    text: "Thời điểm",
    value: "yearOfReceivedCompensation",
    hiddenOnMobile: true,
  },
  {
    text: "",
    value: "memo",
    hiddenOnMobile: true,
  },
];
</script>
