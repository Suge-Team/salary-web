export function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    notation: "compact",
    compactDisplay: "short",
  }).format(amount);
}

export function getMillions(ammount) {
  return Math.ceil(ammount / 1000000);
}
