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
