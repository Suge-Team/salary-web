export function setAdminSessionKey(jwtAccessKey) {
  localStorage.setItem('adminSessionKey', jwtAccessKey)
}

export function getAdminSessionKey() {
  return localStorage.getItem('adminSessionKey')
}

export function getAdminAuthHeader() {
  return { Authorization: `bearer ${getAdminSessionKey()}` }
}
