<template>
  <div class="px-4 py-5 sm:p-6 flex flex-col justify-between sm:block">
    <dt class="text-base font-normal text-gray-900"><slot name="title" /></dt>
    <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
      <div class="flex items-baseline text-2xl font-semibold text-primary">
        <slot name="pre" />
        <slot name="text" />
        <span class="ml-1 text-base font-medium text-gray-500"><slot name="subText" /></span>
      </div>
    </dd>
  </div>
</template>
