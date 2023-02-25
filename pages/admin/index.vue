<template>
  <div>
    <div class="mx-auto max-w-7xl px-4">
      <h1 class="text-2xl font-semibold text-gray-900">Review Lương</h1>
    </div>
    <div class="mx-auto max-w-7xl px-4">
      <core-table :headers="compensationHeaders" :items="allCompensations" :row-class="getRowClass">
        <template #deviceId="{ item }">
          <div class="w-20 break-all whitespace-normal">{{ item.deviceId || "-" }}</div>
        </template>

        <template #companyName="{ item }">
          <div class="w-24">
            <a :href="`/companies/${item.companyId}`" target="_blank" class="text-primary">{{ item.companyName }}</a>
            <dl class="font-normal">
              <dd class="mt-1 truncate text-gray-700">{{ item.city || "-" }}</dd>
              <dd class="mt-1 truncate text-gray-700">{{ item.yearOfExperience || "-" }} YoE</dd>
            </dl>
          </div>
        </template>

        <template #jobInfo="{ item }">
          <div class="w-48">
            <div class="truncate font-bold">{{ item.jobTitle }}</div>
            <dl class="font-normal">
              <dd class="mt-1 truncate text-gray-700">C: {{ item.jobCategory }}</dd>
              <dd class="mt-1 truncate text-gray-700">F: {{ item.jobFocus || "-" }}</dd>
            </dl>
          </div>
        </template>

        <template #compensation="{ item }">
          <span class="text-gray-700">
            M: <b>{{ item.monthlyBaseSalary }}</b>
          </span>
          <dl class="font-normal">
            <dd class="mt-1 truncate text-gray-700">
              A: <b>{{ item.annualExpectedBonus || "-" }}</b>
            </dd>
            <dd class="mt-1 truncate text-gray-700">
              S: <b>{{ item.signingBonus || "-" }}</b>
            </dd>
          </dl>
        </template>

        <template #bonusMemo="{ item }">
          <div class="max-w-[200px] whitespace-normal">{{ item.bonusMemo || "-" }}</div>
        </template>

        <template #otherBenefits="{ item }">
          <div class="max-w-[200px] whitespace-normal">{{ item.otherBenefits || "-" }}</div>
        </template>

        <template #email="{ item }">
          {{ item.email || "-" }}
        </template>

        <template #action="{ item }">
          <div
            v-if="item.reviewStatus === 'rejected' || item.reviewStatus === 'pending'"
            class="cursor-pointer text-primary hover:text-primary-darker mb-2"
            @click="approveCompensation(item)"
          >
            Approve
          </div>
          <div
            v-if="item.reviewStatus === 'approved' || item.reviewStatus === 'pending'"
            class="cursor-pointer text-red-600 hover:text-red-900"
            @click="rejectCompensation(item)"
          >
            Reject
          </div>
        </template>
      </core-table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });

// Pre process compensations, putting all compensations of a device together, and sort by id (most recent first)
let allCompensations = await adminFetchAllCompensations();
allCompensations.sort((a, b) => b.id - a.id);

const compensationGroupedByDeviceId = allCompensations.reduce((acc, compensation) => {
  if (!acc[compensation.deviceId]) {
    acc[compensation.deviceId] = [];
  }
  acc[compensation.deviceId].push(compensation);
  return acc;
}, {});

allCompensations = Object.values(compensationGroupedByDeviceId).flat();

const compensationHeaders = [
  {
    text: "Device Id",
    value: "deviceId",
  },
  {
    text: "Công ty",
    value: "companyName",
  },
  {
    text: "Job Info",
    value: "jobInfo",
  },
  {
    text: "Compensation",
    value: "compensation",
  },
  {
    text: "Bonus Memo",
    value: "bonusMemo",
  },
  {
    text: "Other Benefits",
    value: "otherBenefits",
  },
  {
    text: "Email",
    value: "email",
  },
  {
    text: "Action",
    value: "action",
  },
];

function getRowClass(item) {
  if (item.reviewStatus === "rejected") {
    return "bg-red-50";
  }
  if (item.reviewStatus === "pending") {
    return "bg-yellow-50";
  }
}

async function approveCompensation(item) {
  await adminUpdateCompensation(item.id, { reviewStatus: "approved" });
  item.reviewStatus = "approved";
}

async function rejectCompensation(item) {
  await adminUpdateCompensation(item.id, { reviewStatus: "rejected" });
  item.reviewStatus = "rejected";
}
</script>
