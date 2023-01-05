export function formatDate(isoDateString) {
  return new Date(isoDateString).toLocaleDateString("vi-VN");
}
