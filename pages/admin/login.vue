<template>
  <div class="w-full h-screen flex justify-center">
    <div class="w-80 mt-40">
      <CoreTextField v-model="email" placeholder="Admin Email" type="email" />
      <CoreTextField v-model="username" placeholder="Basic Auth Username" type="text" />
      <CoreTextField v-model="password" placeholder="Basic Auth Password" type="password" />
      <CoreButton class="mt-4 w-full" @click="login">Login</CoreButton>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "empty" });

const router = useRouter();
const email = ref(null);
const username = ref(null);
const password = ref(null);

async function login() {
  try {
    const res = await adminLogin({ email: email.value, username: username.value, password: password.value });
    setAdminSessionKey(res.accessToken);
    router.push("/admin");
  } catch (e) {
    alert(e);
  }
}
</script>
