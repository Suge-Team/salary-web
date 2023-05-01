<template>
  <TransitionRoot as="template" :show="showReminder">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6"
            >
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <HeartIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                    Nhập lương của bạn
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Cảm ơn bạn đã sử dụng trang web. Nhập lương của bạn <b>ẩn danh</b> để giúp trang web ngày càng hữu
                      ích cho mọi người nhé!
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-3 sm:gap-3">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  @click="disableInputReminder"
                >
                  Đã nhập rồi
                </button>

                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-2 sm:mt-0"
                  @click="snoozeInputReminder"
                >
                  Để sau
                </button>

                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2 sm:text-sm"
                  @click="goToTheInputPage"
                >
                  Nhập lương
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { HeartIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const router = useRouter();

const showReminder = ref(false);

const hideInputReminderKey = "hide_input_reminder";
const ignoreReminderUntilKey = "ignore_reminder_until";
const navigationCountKey = "navigation_count";
const minNavigationCountToShownReminder = 10;

let lastRoutePath = "na";

// Check to show compensation input reminder on every page navigation.
watch(route, () => {
  if (route.path === lastRoutePath) {
    return;
  }

  lastRoutePath = route.path;

  // If `hide_input_reminder` is true, it is because the user has chosen to disable the reminder or
  // has navigated to the input page before, so we do nothing
  if (localStorage.getItem(hideInputReminderKey) === "true") {
    return;
  }

  // If `ignore_reminder_until` is present, it is because the user has snoozed the reminder.
  // If it is not the time yet we do nothing.
  const ignoreUntilTimestamp = Number(localStorage.getItem(ignoreReminderUntilKey));
  if (ignoreUntilTimestamp && ignoreUntilTimestamp > new Date().getTime()) {
    return;
  }

  // Everytime the user navigates to a new page, increase the count. To avoid being too intrusive, we make sure
  // the user has used the site for some times before showing the reminder, hence checking the navigation count
  // against a predefined threshold.

  const currentNavigationCount = Number(localStorage.getItem(navigationCountKey)) || 0;
  const newNavigationCount = currentNavigationCount + 1;
  localStorage.setItem(navigationCountKey, newNavigationCount);

  if (newNavigationCount >= minNavigationCountToShownReminder) {
    showReminder.value = true;
  }
});

function disableInputReminder() {
  showReminder.value = false;
  localStorage.setItem(hideInputReminderKey, true);
}

function snoozeInputReminder() {
  showReminder.value = false;
  // Snooze for 24 hours
  localStorage.setItem(ignoreReminderUntilKey, new Date().getTime() + 24 * 60 * 60 * 1000);
  // Also reset navigation count, next time we also want the user to continue using the site for awhile instead of
  // trying to show the reminder immediately
  localStorage.setItem(navigationCountKey, 0);
}

function goToTheInputPage() {
  showReminder.value = false;
  // We have achieved what we want, disable the reminder forever
  localStorage.setItem(hideInputReminderKey, true);

  router.push("/salaries/submit");
}
</script>
