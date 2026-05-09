import * as Yup from "yup";

export const mobileSchema = Yup.object({
  mobile: Yup.string()
    .trim()
    .required("شماره موبایل الزامی است")
    .matches(/^$|^09\d{9}$/, "شماره موبایل معتبر نیست"),
});
