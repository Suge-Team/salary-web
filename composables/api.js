const config = useRuntimeConfig();
const apiBaseUrl = config.apiBaseUrl;

export async function fetchAllCompanies() {
  const res = await useFetch(`${apiBaseUrl}/companies`);
  return res.data.value.companies;
}

export async function fetchPopularCompanies() {
  const res = await useFetch(`${apiBaseUrl}/companies/popular`);
  return res.data.value.companies;
}

export async function fetchCompany(id) {
  const res = await useFetch(`${apiBaseUrl}/companies/${id}`);
  return res.data.value;
}

export async function uploadFile(formData) {
  const res = await $fetch(`${apiBaseUrl}/compensations/docUpload`, {
    method: "POST",
    body: formData,
  })

  return res;
}

export async function fetchAllCompensations() {
  const res = await useFetch(`${apiBaseUrl}/compensations`);
  return res.data.value.compensations;
}

export async function fetchRecentCompensations() {
  const res = await useFetch(`${apiBaseUrl}/compensations/recent`);
  return res.data.value.compensations;
}

export async function fetchCompensationStats() {
  const res = await useFetch(`${apiBaseUrl}/compensations/stats`);
  return res.data.value;
}

export async function createSalary(data) {
  await $fetch(`${apiBaseUrl}/compensations`, {
    method: "POST",
    body: data,
  });
}

/*
 * Admin APIs
 */

export async function adminLogin(credentials) {
  return $fetch(`${apiBaseUrl}/admin/auth/login`, {
    method: "POST",
    body: credentials, 
  })
}

export async function adminFetchAdminProfile() {
  const res = await useFetch(`${apiBaseUrl}/admin/auth/profile`, {
    headers: getAdminAuthHeader(),
  });

  if (res.data?.value?.email) {
    return res.data?.value?.email;
  } else {
    throw new Error(res.error.value);
  } 
}

export async function adminFetchCompensation(id) {
  const res = await useFetch(`${apiBaseUrl}/admin/compensations/${id}`, {
    headers: getAdminAuthHeader(),
  });

  if (res.data.value) {
    return res.data.value;
  } else {
    throw new Error(res.error.value);
  }
}

export async function adminFetchAllCompensations() {
  const res = await useFetch(`${apiBaseUrl}/admin/compensations`, {
    headers: getAdminAuthHeader(),
  });
  return res.data.value.compensations;
}

export async function adminUpdateCompensation(id, attrs) {
  await $fetch(`${apiBaseUrl}/admin/compensations/${id}`, {
    method: "PATCH",
    headers: getAdminAuthHeader(),
    body: { ...attrs, reviewer: adminAuth.value.email },
  });
}
