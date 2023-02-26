<template>
  <div>
    <div class="text-center sm:my-5">
      <h3 class="text-2xl font-medium text-gray-900">Nhập lương của bạn</h3>
      <p class="mt-1 text-sm text-gray-500">
        Thông tin nhập của bạn sẽ được sẽ được đăng <b>ẩn danh</b> trên trang web. <br />Cùng nhau xây dựng bộ dữ liệu
        hữu ích cho tất cả mọi người nhé!
      </p>
    </div>

    <div class="flex flex-wrap justify-center md:space-x-28">
      <div class="p-2 w-72">
        <nuxt-link
          to="/salaries/submit/certification-upload"
          class="w-full inline-flex justify-center rounded-md border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-darker focus:ring-primary-lighter"
        >
          Tải lên hợp đồng lương
        </nuxt-link>

        <ul role="list" class="divide-y divide-gray-200 border rounded-md border-inherit text-sm text-gray-500 mt-2">
          <li class="px-3 py-2">Ẩn danh</li>
          <li class="flex space-x-0.5 px-3 py-2">
            Nội dung được chứng thực bằng
            <CheckBadgeIcon class="ml-1 h-5 w-5 text-green-600" aria-hidden="true" />
          </li>
          <li class="px-3 py-2">Review nhanh hơn</li>
          <li class="px-3 py-2">Xoá ngay sau khi review</li>
          <li class="px-3 py-2">Love from cộng đồng IT VN <span class="text-red-600">❤</span></li>
        </ul>
      </div>
      <div class="p-2 w-72">
        <nuxt-link
          to="/salaries/submit/form-input"
          class="w-full inline-flex justify-center rounded-md border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-darker focus:ring-primary-lighter"
        >
          Nhập lương thủ công
        </nuxt-link>

        <ul role="list" class="divide-y divide-gray-200 border rounded-md border-inherit text-sm text-gray-500 mt-2">
          <li class="px-3 py-2">Ẩn danh</li>
          <li class="px-3 py-2">Love from cộng đồng IT VN <span class="text-red-600">❤</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckBadgeIcon } from "@heroicons/vue/24/outline";
import { HeartIcon } from "@heroicons/vue/24/solid";
</script>
