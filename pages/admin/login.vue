<template>
  <div class="w-full h-screen flex justify-center">
    <div class="w-80 mt-40">
      <CoreTextField v-model="auth.email" placeholder="Admin Email" type="email" />
      <CoreTextField v-model="auth.username" placeholder="Basic Auth Username" type="text" />
      <CoreTextField v-model="auth.password" placeholder="Basic Auth Password" type="password" />
      <CoreButton class="mt-4 w-full" @click="login">Login</CoreButton>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "empty" });

const router = useRouter();
const auth = useAdminAuth();

async function login() {
  try {
    await adminFetchCompensation(1);
    router.push("/admin");
  } catch (e) {
    alert(e);
  }
}
</script>
