"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/core/config/api";
import { toEnglishNumber } from "@/core/utils/number";
import useGetUserDate from "@/core/services/queries";
import TourDuration from "@/core/utils/tourDuration";

export default function PassengerInfoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const { data: userData, isLoading: userLoading } = useGetUserDate();
  const user = userData?.data;

  const [tour, setTour] = useState(null);
  const [tourLoading, setTourLoading] = useState(true);
  const [tourError, setTourError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    birthDate: "",
    gender: "",
  });

  const fullName = useMemo(() => {
    return `${form.firstName} ${form.lastName}`.trim();
  }, [form.firstName, form.lastName]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      try {
        setTourLoading(true);
        setTourError("");

        console.log("ID from URL:", id);
        console.log("Final API URL:", `/tour/${id}`);

        const res = await api.get(`/tour/${id}`);
        console.log("Tour API response:", res);

        const tourData = res.data;

        setTour(tourData);
      } catch (err) {
        console.error("Tour fetch error:", err);
        setTourError(
          err?.response?.data?.message ||
            "دریافت اطلاعات تور با خطا مواجه شد."
        );
      } finally {
        setTourLoading(false);
      }
    };

    fetchTour();
  }, [id]);


  useEffect(() => {
    if (!user) return;

    setForm((prev) => ({
      ...prev,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      nationalCode: user.nationalCode || "",
      birthDate: user.birthDate || "",
      gender: user.gender || "",
    }));
  }, [user]);

  const validateForm = () => {
    if (!form.firstName.trim()) {
      alert("لطفاً نام را وارد کنید");
      return false;
    }

    if (!form.lastName.trim()) {
      alert("لطفاً نام خانوادگی را وارد کنید");
      return false;
    }

    if (!form.nationalCode.trim()) {
      alert("لطفاً کد ملی را وارد کنید");
      return false;
    }

    if (form.nationalCode.length !== 10) {
      alert("کد ملی باید ۱۰ رقم باشد");
      return false;
    }

    if (!form.birthDate) {
      alert("لطفاً تاریخ تولد را وارد کنید");
      return false;
    }

    if (!form.gender) {
      alert("لطفاً جنسیت را انتخاب کنید");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!id) {
      alert("شناسه تور نامعتبر است");
      return;
    }

    try {
      setSubmitting(true);

      const profilePayload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        gender: form.gender,
        birthDate: form.birthDate,
        nationalCode: form.nationalCode,
      };

      const orderPayload = {
        nationalCode: form.nationalCode,
        fullName,
        gender: form.gender,
        birthDate: form.birthDate,
      };

      // 1) ذخیره اطلاعات در پروفایل کاربر
      await api.put("/user/profile", profilePayload);

      // 2) افزودن تور به سبد
      await api.put(`/basket/${id}`);

      // 3) ثبت سفارش
      await api.post("/order", orderPayload);

      router.push("/profile/my-tours");
    } catch (e) {
      console.error("Submit error:", e);
      alert(e?.response?.data?.message || "خطایی در ثبت اطلاعات رخ داد");
    } finally {
      setSubmitting(false);
    }
  };

  if (tourLoading || userLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
        <p className="text-gray-500">در حال بارگذاری...</p>
      </div>
    );
  }

  if (tourError) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
        <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4">
          {tourError}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col-reverse md:flex-row gap-6">
      {/* فرم مشخصات مسافر */}
      <div className="w-full md:w-2/3 bg-white p-5 border rounded-xl shadow-sm">
        <h2 className="text-lg font-bold mb-6">مشخصات مسافر</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="نام"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="border rounded-lg p-3 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="نام خانوادگی"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="border rounded-lg p-3 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="کد ملی"
            maxLength={10}
            value={form.nationalCode}
            onChange={(e) => {
              const english = toEnglishNumber(e.target.value);
              const cleaned = english.replace(/\D/g, "");
              handleChange("nationalCode", cleaned);
            }}
            className="border rounded-lg p-3 outline-none focus:border-blue-500"
          />

          <input
            type="date"
            value={form.birthDate}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            className="border rounded-lg p-3 outline-none focus:border-blue-500"
          />

          <select
            value={form.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="border rounded-lg p-3 outline-none focus:border-blue-500 md:col-span-2"
          >
            <option value="">انتخاب جنسیت</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
        </div>
      </div>


<div className="w-full md:w-1/3 bg-white p-5 border rounded-xl shadow-sm h-fit">
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-lg font-bold">{tour?.title}</h2>

    {tour?.startDate && tour?.endDate && (
      <TourDuration
        startDate={tour.startDate}
        endDate={tour.endDate}
      />
    )}
  </div>

  <div className="border-t border-dashed pt-4 mt-4 flex justify-between items-center">
    <span className="text-gray-700">قیمت نهایی</span>
    <span className="text-lg font-bold text-blue-600">
      {tour?.price ? `${tour.price.toLocaleString("fa-IR")} تومان` : "—"}
    </span>
  </div>

  <button
    onClick={handleSubmit}
    disabled={submitting}
    className={`w-full mt-5 py-3 rounded-lg text-white transition ${
      submitting
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }`}
  >
    {submitting ? "در حال ثبت..." : "ثبت و خرید نهایی"}
  </button>
</div>

    </div>
  );
}
