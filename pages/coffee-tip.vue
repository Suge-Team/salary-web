<template>
  <div class="grid place-items-center">
    <div class="sm:w-1/2">
      <div class="text-center">
        <h3 class="text-2xl font-medium text-gray-900">Buy us a ☕</h3>
        <p class="text-gray-500 mt-2">
          Nếu thấy trang web hữu ích, bạn có thể ủng hộ đội ngũ phát triển bằng một trong các hình thức sau:
        </p>
      </div>

      <ul role="list" class="border rounded mt-4">
        <li class="grid place-items-center py-4">
          <a class="ml-2" href="https://ko-fi.com/sugeteam" target="_blank">
            <img class="h-7 w-auto" src="~/assets/images/kofi.png" alt="Coffee tip" />
          </a>
        </li>

        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-200" />
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-2 text-sm text-gray-500">hoặc</span>
          </div>
        </div>

        <li class="grid place-items-center py-4">
          <div class="flex">
            <h4 class="ml-2 mr-1 text-base font-medium text-gray-900">Ví điện tử</h4>
            <img class="h-7 w-auto pb-2" src="~/assets/images/momo.png" alt="Momo" />
          </div>

          <img class="h-80 w-auto mb-4" src="~/assets/images/momo_qr.jpg" alt="Momo" />
        </li>
      </ul>
    </div>
  </div>
</template>
