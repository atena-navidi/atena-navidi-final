export function toPersianNumber(value) {
  if (value === null || value === undefined) return "";

  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

export function toEnglishNumber(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
}
