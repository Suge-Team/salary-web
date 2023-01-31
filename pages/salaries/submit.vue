<template>
  <div>
    <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="submitSalary">
      <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 class="text-2xl font-medium text-gray-900">Nhập lương của bạn</h3>
            <p class="mt-1 text-sm text-gray-500">
              Thông tin điền ở đây (trừ email) sẽ được đăng <b>ẩn danh</b> trên trang web
            </p>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <CoreAutocomplete
                v-model="companyName"
                label="Tên công ty"
                :items="companyNames"
                :invalid="!!v$.companyName.$error"
              />
            </div>

            <div class="sm:col-span-3">
              <CoreSelect v-model="city" label="Tỉnh thành" :items="cityItems" :invalid="!!v$.city.$error" />
            </div>

            <div class="sm:col-span-3">
              <CoreAutocomplete
                v-model="jobTitle"
                label="Vị trí"
                :items="companyNames"
                :invalid="!!v$.jobTitle.$error"
              />
            </div>

            <div class="sm:col-span-3">
              <CoreSelect
                v-model="jobCategory"
                label="Phân loại"
                :items="cityItems"
                :invalid="!!v$.jobCategory.$error"
              />
            </div>

            <div class="sm:col-span-3">
              <CoreAutocomplete v-model="jobFocus" label="Chuyên môn" :items="companyNames" optional />
            </div>

            <div class="sm:col-span-3">
              <CoreAutocomplete v-model="level" label="Cấp bậc" :items="companyNames" optional />
            </div>

            <div class="sm:col-span-3">
              <CoreTextField
                v-model="yearOfExperience"
                label="Số năm kinh nghiệm"
                type="number"
                :invalid="!!v$.yearOfExperience.$error"
              />
            </div>

            <div class="sm:col-span-3">
              <CoreTextField v-model="yearAtCompany" label="Số năm ở công ty" type="number" optional />
            </div>

            <div class="sm:col-span-3">
              <CoreTextField
                v-model="monthlySalary"
                label="Lương tháng"
                type="text"
                currency-unit="triệu VND"
                :invalid="!!v$.monthlySalary.$error"
              />
            </div>

            <div class="sm:col-span-3">
              <CoreTextField
                v-model="annualBonus"
                label="Bonus theo năm"
                type="text"
                currency-unit="triệu VND"
                optional
              />
            </div>

            <div class="sm:col-span-3">
              <CoreTextField
                v-model="signingBonus"
                label="Bonus ký hợp đồng"
                type="text"
                currency-unit="triệu VND"
                optional
              />
            </div>

            <div class="sm:col-span-3">
              <CoreTextField v-model="email" label="Email" type="email" optional />
            </div>

            <div class="sm:col-span-6">
              <CoreTextArea v-model="bonusMemo" label="Ghi chú thêm về bonus" optional />
            </div>

            <div class="sm:col-span-6">
              <CoreTextArea v-model="otherBenefits" label="Quyền lợi khác" optional />
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="submit"
            class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Gửi thông tin lương
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const city = ref(null);
const companyName = ref(null);
const jobTitle = ref(null);
const jobCategory = ref(null);
const jobFocus = ref(null);
const level = ref(null);
const yearOfExperience = ref(null);
const yearAtCompany = ref(null);
const monthlySalary = ref(null);
const annualBonus = ref(null);
const signingBonus = ref(null);
const bonusMemo = ref(null);
const otherBenefits = ref(null);
const email = ref(null);

const cityItems = [
  {
    id: "Ha Noi",
    text: "Ha Noi",
  },
  {
    id: "tp HCM",
    text: "tp HCM",
  },
];

const companyNames = ["FPT", "VNG", "Google"];

const rules = {
  companyName: { required },
  city: { required },
  jobTitle: { required },
  jobCategory: { required },
  yearOfExperience: { required },
  monthlySalary: { required },
};
const v$ = useVuelidate(rules, { companyName, city, jobTitle, jobCategory, yearOfExperience, monthlySalary });

async function submitSalary() {
  console.log("submit");
  await v$.value.$validate();
}
</script>
