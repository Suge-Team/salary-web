export function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    notation: "compact",
    compactDisplay: "short",
  }).format(amount);
}

export function getBillions(ammount) {
  return Math.floor(ammount / 1000);
}

export function getMillions(ammount) {
  return Math.floor(ammount % 1000);
}

export function formatMillion(ammount) {
  const billion = Math.floor(ammount / 1000);
  const million = Math.floor(ammount % 1000);

  let result = "";
  if (billion > 0) {
    result += `${billion} tỷ`;
  }
  if (million > 0) {
    result += ` ${million} tr`;
  }

  return result.trim() || "-";
}
