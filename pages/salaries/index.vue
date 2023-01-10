<template>
  <div>
    <!-- Heading -->
    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-2xl font-medium text-gray-900">Tham khảo lương</h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <nuxt-link
          to="/salaries"
          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Nhập lương của bạn
        </nuxt-link>
      </div>
    </div>

    <dl
      class="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-y-0 md:divide-x"
    >
      <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6">
        <dt class="text-base font-normal text-gray-900">{{ item.name }}</dt>
        <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
            {{ item.median }}
            <span class="ml-2 text-sm font-medium text-gray-500">triệu</span>
          </div>
        </dd>
      </div>
    </dl>

    <!-- Filters -->
    <div class="flex flex-row gap-4 mb-4 mt-8">
      <core-text-field v-model="searchQuery" class="basis-1/4" label="Công ty" placeholder="FPT, LINE, etc" />
      <core-select v-model="selectedRole" class="basis-1/4" label="Vị trí" :items="roleItems" />
      <core-select v-model="selectedFocus" class="basis-1/4" label="Mảng" :items="focusItems" />
      <core-text-field v-model.number="yoe" class="basis-1/4" label="Số năm kinh nghiệm" type="number" />
    </div>

    <!-- Salary table -->
    <core-table :headers="salaryHeaders" :items="salaryItems" @sort-changed="updateSort">
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

const searchQuery = ref("");
const selectedRole = ref(roleItems[0]);
const selectedFocus = ref(focusItems[0]);
const yoe = ref(null);
const sortBy = ref(null);
const sortOrder = ref(null);

const queryParams = computed(() => {
  return {
    searchQuery: searchQuery.value || undefined,
    role: selectedRole.value.id,
    focus: selectedFocus.value.id,
    yoe: yoe.value || undefined,
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
