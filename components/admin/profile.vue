<template>
  <div class="w-full flex justify-center text-white">
    {{ auth.email || "No email" }}
  </div>
</template>

<script setup>
const auth = useAdminAuth();
</script>
