<template>
  <div>
    <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="submitSalary">
      <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 class="text-2xl font-medium text-gray-900">Nhập lương của bạn</h3>
            <p class="mt-1 text-sm text-gray-500">
              Thông tin điền ở đây (trừ email) sẽ được đăng <b>ẩn danh</b> trên trang web. <br />Cùng nhau xây dựng bộ
              dữ liệu hữu ích cho tất cả mọi người nhé!
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
              <CoreTextField
                v-model="yearOfExperience"
                label="Số năm kinh nghiệm"
                type="number"
                :invalid="!!v$.yearOfExperience.$error"
              />
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
                v-model="annualExpectedBonus"
                label="Thưởng theo năm"
                type="text"
                currency-unit="triệu VND"
                placeholder="Tính cả lương tháng 13, v.v"
                :invalid="!!v$.annualExpectedBonus.$error"
              />
            </div>

            <div class="sm:col-span-3">
              <CoreAutocomplete
                v-model="jobTitle"
                label="Chức danh"
                :items="jobTitles"
                :invalid="!!v$.jobTitle.$error"
                placeholder="VD: Senior Software Engineer 2"
                @focus="fetchJobTitles"
              />
            </div>

            <div class="sm:col-span-3">
              <CoreSelect
                v-model="jobCategory"
                label="Phân loại công việc"
                :items="categoryItems"
                :invalid="!!v$.jobCategory.$error"
              />
            </div>

            <div class="sm:col-span-3">
              <CoreSelect v-model="city" label="Tỉnh thành" :items="cityItems" optional />
            </div>

            <div class="sm:col-span-3">
              <CoreSelect v-model="jobFocus" label="Chuyên môn" :items="focusItems" optional />
            </div>

            <div class="sm:col-span-3">
              <CoreAutocomplete
                v-model="level"
                label="Cấp bậc / Rank"
                :items="levels"
                optional
                placeholder="Nếu công ty có hệ thống cấp bậc"
                @focus="fetchLevels"
              />
            </div>

            <div class="sm:col-span-3">
              <CoreTextField
                v-model="signingBonus"
                label="Signing bonus"
                type="text"
                currency-unit="triệu VND"
                optional
              />
            </div>

            <div class="sm:col-span-6">
              <CoreTextArea v-model="bonusMemo" label="Ghi chú thêm về lương thưởng" optional />
            </div>

            <div class="sm:col-span-6">
              <CoreTextArea v-model="otherBenefits" label="Quyền lợi khác" optional />
            </div>

            <div class="sm:col-span-3">
              <CoreTextField
                v-model="email"
                label="Email"
                type="email"
                optional
                placeholder="Bọn mình có thể liên lạc để xác nhận thông tin"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="submit"
            class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2"
          >
            Gửi thông tin lương
          </button>
        </div>
      </div>
    </form>

    <CoreDialogConfirm :open="openConfirmDialog" title="Kudos to you" @confirm="onConfirm">
      Bọn mình đã lưu thông tin và sẽ review sớm nhất có thể. Cảm ơn bạn nhé!
    </CoreDialogConfirm>
  </div>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const router = useRouter();

const city = ref(null);
const companyName = ref(null);
const jobTitle = ref(null);
const jobCategory = ref(null);
const jobFocus = ref(null);
const yearOfExperience = ref(null);
const monthlySalary = ref(null);
const annualExpectedBonus = ref(null);
const signingBonus = ref(null);
const bonusMemo = ref(null);
const level = ref(null);
const otherBenefits = ref(null);
const email = ref(null);

const openConfirmDialog = ref(false);

const jobTitles = ref([]);
const levels = ref([]);

const categoryItems = jobCategories.map((category, index) => ({ id: index, text: category }));
const focusItems = jobFocuses.map((focus, index) => ({ id: index, text: focus }));

const companies = await fetchAllCompanies();
const companyNames = companies.map((company) => company.name);

const cityItems = cities.map((city, index) => ({ id: index, text: city }));
const rules = {
  companyName: { required },
  jobTitle: { required },
  jobCategory: { required },
  yearOfExperience: { required },
  monthlySalary: { required },
  annualExpectedBonus: { required, minLength: minLength(1) },
};
const v$ = useVuelidate(rules, {
  companyName,
  jobTitle,
  jobCategory,
  yearOfExperience,
  monthlySalary,
  annualExpectedBonus,
});

async function submitSalary() {
  const result = await v$.value.$validate();
  if (result) {
    await createSalary({
      companyName: companyName.value,
      city: city.value?.text,
      jobTitle: jobTitle.value,
      jobCategory: jobCategory.value?.text,
      jobFocus: jobFocus.value?.text || undefined,
      yearOfExperience: parseInt(yearOfExperience.value),
      monthlyBaseSalary: parseInt(monthlySalary.value),
      annualExpectedBonus: parseInt(annualExpectedBonus.value) || 0,
      signingBonus: signingBonus.value ? parseInt(signingBonus.value) : undefined,
      bonusMemo: bonusMemo.value || undefined,
      level: level.value || undefined,
      otherBenefits: otherBenefits.value || undefined,
      email: email.value || undefined,
      deviceId: getDeviceId(),
    });

    openConfirmDialog.value = true;
  }
}

async function fetchJobTitles() {
  if (!companyName.value) return;

  const company = companies.find((company) => company.name === companyName.value);
  if (company) {
    const companyDetail = await fetchCompany(company.id);
    jobTitles.value = companyDetail.compensations.map((compensation) => compensation.jobTitle);
  } else {
    jobTitles.value = [];
  }
}

async function fetchLevels() {
  if (!companyName.value) return;

  const company = companies.find((company) => company.name === companyName.value);
  if (company) {
    const companyDetail = await fetchCompany(company.id);
    levels.value = companyDetail.compensations.map((compensation) => compensation.level);
  } else {
    levels.value = [];
  }
}

async function onConfirm() {
  openConfirmDialog.value = false;
  router.push("/");
}
</script>
