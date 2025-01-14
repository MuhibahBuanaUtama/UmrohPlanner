export const FormatToNumberUtil = (value) => {
  return parseFloat(value.replace(/[Rp. ]/g, "").replace(/,/g, ""));
};
