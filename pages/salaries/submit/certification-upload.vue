<template>
  <div>
    <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="submitSalary">
      <div class="space-y-8">
        <div>
          <h3 class="text-2xl font-medium text-gray-900">Tải lên hợp đồng lương</h3>
          <p class="mt-1 mb-2 ml-1 text-sm text-gray-500">
            Tải lên hợp đồng lương của bạn. VD: Offer Letter, Yearly Comp Statement, Promotion Summary, vv. <br />
            File tải lên có kích thước dưới 10MB
          </p>

          <CoreFileUpload
            name="certification-upload"
            :invalid="!!v$.fileUrl.$error"
            @update:model-value="handleFileUpload"
          />
        </div>
        <div>
          <h3 class="text-2xl font-medium text-gray-900">Nhập thông tin bổ sung</h3>

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
              <CoreSelect v-model="city" label="Nơi làm việc" :items="cityItems" optional />
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
                v-model="yearOfReceivedCompensation"
                label="Năm nhận hợp đồng lương"
                :invalid="!!v$.yearOfReceivedCompensation.$error"
              />
            </div>

            <div class="sm:col-span-6">
              <CoreTextArea v-model="bonusMemo" label="Ghi chú thêm về lương thưởng" optional />
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
import { required } from "@vuelidate/validators";

const router = useRouter();

const city = ref(null);
const companyName = ref(null);
const jobTitle = ref(null);
const jobCategory = ref(null);
const jobFocus = ref(null);
const yearOfExperience = ref(null);
const yearOfReceivedCompensation = ref(new Date().getFullYear().toString());
const bonusMemo = ref(null);
const level = ref(null);
const fileUrl = ref(null);

const openConfirmDialog = ref(false);

const jobTitles = ref([]);
const levels = ref([]);

const categoryItems = jobCategories;
const focusItems = jobFocuses;

const companies = await fetchAllCompanies();
const companyNames = companies.map((company) => company.name);

const cityItems = cities.map((city, index) => ({ id: index, text: city }));

const rules = {
  companyName: { required },
  jobTitle: { required },
  jobCategory: { required },
  yearOfExperience: { required },
  yearOfReceivedCompensation: { required },
  fileUrl: { required },
};

const v$ = useVuelidate(rules, {
  companyName,
  jobTitle,
  jobCategory,
  yearOfExperience,
  yearOfReceivedCompensation,
  fileUrl,
});

async function submitSalary() {
  const result = await v$.value.$validate();

  if (!result) return;
  try {
    // monthly salary and bonus will be updated later by admin
    await createSalary({
      companyName: companyName.value,
      city: city.value?.text,
      jobTitle: jobTitle.value,
      jobCategory: jobCategory.value?.id,
      jobFocus: jobFocus.value?.id || undefined,
      yearOfExperience: parseInt(yearOfExperience.value),
      yearOfReceivedCompensation: yearOfReceivedCompensation.value,
      monthlyBaseSalary: 1,
      annualExpectedBonus: 0,
      bonusMemo: bonusMemo.value || undefined,
      level: level.value || undefined,
      fileUrl: fileUrl.value,
      deviceId: getDeviceId(),
    });
  } catch (err) {
    alert("Có lỗi xảy ra, vui lòng kiểm tra thông tin và thử lại");
    return;
  }

  openConfirmDialog.value = true;

  localStorage.setItem(hideInputReminderKey, true);
  sendGaEvent("submit_compensation");
}

async function fetchJobTitles() {
  if (!companyName.value) return;

  const company = companies.find((company) => company.name === companyName.value);
  if (company) {
    const companyDetail = await fetchCompany(company.id);
    const rawJobTitles = companyDetail.compensations.map((compensation) => compensation.jobTitle);
    const uniqueJobTitles = [...new Set(rawJobTitles)];
    jobTitles.value = uniqueJobTitles;
  } else {
    jobTitles.value = [];
  }
}

async function fetchLevels() {
  if (!companyName.value) return;

  const company = companies.find((company) => company.name === companyName.value);
  if (company) {
    const companyDetail = await fetchCompany(company.id);
    const rawLevels = companyDetail.compensations.map((compensation) => compensation.level);
    const nullFilteredLevels = rawLevels.filter((e) => !!e);
    const uniqueLevels = [...new Set(nullFilteredLevels)];
    levels.value = uniqueLevels;
  } else {
    levels.value = [];
  }
}

async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    alert("Bạn chưa chọn file, vui lòng thử lại!");
    return;
  }

  // Uploaded file size must be less than 10MB
  if (file.size > 10485760) {
    alert("Vui lòng chọn file có kích thước dưới 10MB");
    event.target.value = null;
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    fileUrl.value = await uploadFile(formData);
  } catch (error) {
    alert("Có lỗi xảy ra khi upload file, vui lòng thử lại!");
    event.target.value = null;
    return;
  }
}

async function onConfirm() {
  openConfirmDialog.value = false;
  router.push("/");
}

useHead({
  title: "Tải lên hợp đồng lương ẩn danh - Lương Tháng",
});
</script>
