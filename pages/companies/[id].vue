<template>
  <div>
    <!-- Heading -->
    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-2xl font-medium text-gray-900">{{ company.name }}</h3>
      <div class="mt-3 sm:mt-0 sm:ml-4"></div>
    </div>

    <core-stat-card :item-count="5">
      <core-stat-item>
        <template #title>Lương năm median</template>
        <template #text>
          <template v-if="getBillions(company.compensationMedian) > 0">
            {{ getBillions(company.compensationMedian)
            }}<span class="mx-1 text-base font-medium text-gray-500">tỷ</span>
          </template>
          {{ getMillions(company.compensationMedian) }}
        </template>
        <template #subText>triệu</template>
      </core-stat-item>

      <core-stat-item>
        <template #title>Thấp nhất</template>
        <template #text>
          <template v-if="getBillions(company.compensationMin) > 0">
            {{ getBillions(company.compensationMin) }}<span class="mx-1 text-base font-medium text-gray-500">tỷ</span>
          </template>
          {{ getMillions(company.compensationMin) }}
        </template>
        <template #subText>triệu</template>
      </core-stat-item>

      <core-stat-item>
        <template #title>Cao nhất</template>
        <template #text>
          <template v-if="getBillions(company.compensationMax) > 0">
            {{ getBillions(company.compensationMax) }}<span class="mx-1 text-base font-medium text-gray-500">tỷ</span>
          </template>
          {{ getMillions(company.compensationMax) }}
        </template>
        <template #subText>triệu</template>
      </core-stat-item>

      <core-stat-item>
        <template #title>Kinh nghiệm trung bình</template>
        <template #text>{{ company.meanYearOfExperience }}</template>
        <template #subText>năm</template>
      </core-stat-item>

      <core-stat-item>
        <template #title>Số lượt đăng</template>
        <template #text>{{ company.compensationCount }}</template>
      </core-stat-item>
    </core-stat-card>

    <!-- Salary table -->
    <core-table
      class="mt-5"
      :headers="compensationHeaders"
      :items="compensations"
      :initial-sort-by="sortBy"
      :initial-sort-order="sortOrder"
      @sort-changed="updateSort"
    >
      <template #jobTitle="{ item }">
        <div class="max-w-[150px] text-ellipsis overflow-hidden">{{ item.jobTitle }}</div>
        <dl class="font-normal sm:hidden">
          <dd class="mt-1 truncate text-gray-500">{{ item.yearOfExperience || "-" }} YoE</dd>
        </dl>
      </template>

      <template #jobCategory="{ item }">
        {{ jobCategoriesMap[item.jobCategory] || item.jobCategory }}
      </template>

      <template #jobFocus="{ item }">
        {{ jobFocusesMap[item.jobFocus] || item.jobFocus || "-" }}
      </template>

      <template #yearOfExperience="{ item }">
        {{ item.yearOfExperience || "-" }}
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
  </div>
</template>

<script setup>
import { CheckBadgeIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const company = await fetchCompany(route.params.id);

const compensationHeaders = [
  {
    text: "Chức danh",
    value: "jobTitle",
    sortable: true,
  },
  {
    text: "Phân loại",
    value: "jobCategory",
    sortable: true,
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
  {
    text: "",
    value: "memo",
    hiddenOnMobile: true,
  },
];

const sortBy = ref("totalCompensation");
const sortOrder = ref(SortOrder.DESC);

const compensations = computed(() => {
  let result = company.compensations;

  if (sortBy.value) {
    result = sortCollection(result, sortBy.value, sortOrder.value);
  }

  return result;
});

function updateSort(sort) {
  sortBy.value = sort.sortBy;
  sortOrder.value = sort.sortOrder;
}

const latestComp = computed(() => {
  return sortCollection(company.compensations, ref("createdAt"), sortOrder.value)[0];
});

const jsonLd = 
{
  "@context": "https://schema.googleapis.com/",
  "@type": "OccupationAggregationByEmployer",
  "name": "Software Engineer",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "lastReviewed": `${latestComp.value.createdAt}`
  },
  "description": `Mức lương trung bình của kỹ sư IT ở công ty ${company.name}`,
  "estimatedSalary": [
    {
      "@type": "MonetaryAmountDistribution",
      "name": "base",
      "currency": "VND",
      "duration": "P1Y",
      "median": `${company.compensationMedian * 1000000}`,
    }
  ],
  "hiringOrganization": {
    "@type": "Organization",
    "name": `${company.name}`
  },
  "occupationLocation": [
    {
      "@type": "City",
      "name": `${latestComp.value.city ||= 'N/A'}`
    },
  ],
  "sampleSize": company.compensations.size,
  "industry": "Technology",
}

const metaTitle = `Mức lương ở công ty ${company.name} - Lương Tháng`;
const metaDescription = `Lương năm median: ${company.compensationMedian} triệu, thấp nhất: ${company.compensationMin} triệu, cao nhất: ${company.compensationMax} triệu, số năm kinh nghiệm trung bình: ${company.meanYearOfExperience} năm, số lượt đăng: ${company.compensationCount}.`;
useHead({
  title: metaTitle,
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
  script: [
        {
            type: 'application/ld-json',
            children: JSON.stringify(jsonLd),
        },
    ],
})
</script>

