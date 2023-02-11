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
        <template #text>{{ company.compensationMedian }}</template>
        <template #subText>triệu</template>
      </core-stat-item>

      <core-stat-item>
        <template #title>Thấp nhất</template>
        <template #text>{{ company.compensationMin }}</template>
        <template #subText>triệu</template>
      </core-stat-item>

      <core-stat-item>
        <template #title>Cao nhất</template>
        <template #text>{{ company.compensationMax }}</template>
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
const route = useRoute();
const company = await fetchCompany(route.params.id);

const compensationHeaders = [
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
</script>
