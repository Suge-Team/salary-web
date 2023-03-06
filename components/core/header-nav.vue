<template>
  <!-- When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars -->
  <Popover v-slot="{ open }" as="template">
    <header
      :class="[open ? 'fixed inset-0 z-40 overflow-y-auto' : '', 'bg-white shadow-sm lg:static lg:overflow-y-visible']"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
            <div class="flex flex-shrink-0 items-center">
              <nuxt-link to="/">
                <div class="flex">
                  <img class="block h-10 w-auto" src="~/assets/images/logo.png" alt="Your Company" />
                  <span class="font-medium my-auto ml-2 text-xl text-primary hidden sm:block">Lương Tháng</span>
                </div>
              </nuxt-link>
            </div>
          </div>
          <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-5">
            <div class="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
              <div class="w-full">
                <CoreAutocomplete v-model="companyName" placeholder="Tìm công ty" :items="companyNames" no-custom>
                  <template #icon>
                    <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </template>
                </CoreAutocomplete>
              </div>
            </div>
          </div>
          <div class="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
            <!-- Mobile menu button -->
            <PopoverButton
              class="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-lighter"
            >
              <span class="sr-only">Open menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>
          <div class="hidden lg:flex lg:justify-end xl:col-span-5">
            <nuxt-link
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium mr-4"
              :class="
                item.current
                  ? 'border-primary-lighter text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              "
            >
              {{ item.name }}
            </nuxt-link>

            <div class="flex items-center">
              <nuxt-link
                to="/salaries/submit"
                class="ml-6 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2"
              >
                Nhập lương
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <PopoverPanel v-slot="{ close }" as="nav" class="lg:hidden" aria-label="Global">
        <div class="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
          <nuxt-link
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            :class="[
              item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
              'block rounded-md py-2 px-3 text-base font-medium',
            ]"
            @click="close"
          >
            {{ item.name }}
          </nuxt-link>
        </div>
      </PopoverPanel>

      <nuxt-link
        v-if="!route.path.startsWith('/salaries/submit')"
        type="button"
        to="/salaries/submit"
        class="fixed z-20 bottom-4 right-4 lg:hidden items-center rounded-full border border-transparent bg-primary p-3 text-white shadow-sm hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2"
      >
        <PlusIconOutline class="h-6 w-6" aria-hidden="true" />
      </nuxt-link>
    </header>
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { Bars3Icon, XMarkIcon, PlusIcon as PlusIconOutline } from "@heroicons/vue/24/outline";

const route = useRoute();
const router = useRouter();

const navigation = computed(() => {
  return [
    { name: "Trang chủ", to: "/", current: route.path === "/" || route.path === "" },
    { name: "Lương", to: "/salaries", current: route.path.startsWith("/salaries") },
    { name: "Công ty", to: "/companies", current: route.path.startsWith("/companies") },
  ];
});

const companyName = ref(null);

const companies = await fetchAllCompanies();
const companyNames = companies.map((company) => company.name);

watch(companyName, (value) => {
  if (value) {
    const company = companies.find((company) => company.name === value);
    if (company) {
      router.push(`/companies/${company.slug}`);
    }
  }
});
</script>
