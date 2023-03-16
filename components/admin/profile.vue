<template>
  <div class="w-full flex justify-center text-white">
    {{ profile.email || "No email" }}
  </div>
</template>

<script setup>
const profile = adminProfile();
</script>
