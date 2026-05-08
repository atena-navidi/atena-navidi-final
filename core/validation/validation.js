//travel-agency/core/validation/validation.js
import * as Yup from "yup";

// -------------------------------------------
// 1) Mobile validation (برای OTP و همه فرم‌ها)
// -------------------------------------------
export const mobileSchema = Yup.object({
 mobile: Yup.string()
  .trim()
  .required("شماره موبایل الزامی است")
  .matches(/^$|^09\d{9}$/, "شماره موبایل معتبر نیست")

});

// -------------------------------------------
// 2) Profile validation (فرم پروفایل)
// -------------------------------------------
export const profileSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("ایمیل معتبر نیست")
    .required("ایمیل الزامی است"),

  nationalCode: Yup.string()
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),

  gender: Yup.string()
    .oneOf(["male", "female"], "جنسیت را انتخاب کنید"),

  birthDate: Yup.date().nullable().required("تاریخ تولد الزامی است"),

  cardNumber: Yup.string()
    .nullable()
    .matches(/^\d{16}$/, "شماره کارت باید ۱۶ رقم باشد"),

  shebaNumber: Yup.string()
    .nullable()
    .matches(/^IR\d{24}$/, "شماره شبا باید با IR شروع شود و ۲۴ رقم داشته باشد"),
});

