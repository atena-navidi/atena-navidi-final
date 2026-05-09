"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/core/config/api";
import { toPersianNumber } from "@/core/utils/number";
import useGetUserDate from "@/core/services/queries";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfilePage() {
  const { data, isLoading } = useGetUserDate();
  const queryClient = useQueryClient();

  const user = data?.data;
  const [form, setForm] = useState(initialForm());
  const [editingSection, setEditingSection] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    setForm(populateForm(user));
  }, [user]);

  function initialForm() {
    return {
      mobile: "",
      email: "",
      fullName: "",
      gender: "",
      birthDate: "",
      nationalCode: "",
      payment: {
        shaba_code: "",
        debitCard_code: "",
        accountIdentifier: "",
      },
    };
  }

  function populateForm(user) {
    return {
      mobile: user.mobile || "",
      email: user.email || "",
      fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      gender: user.gender || "",
      birthDate: user.birthDate || "",
      nationalCode: user.nationalCode || "",
      payment: {
        shaba_code: user.payment?.shaba_code || "",
        debitCard_code: user.payment?.debitCard_code || "",
        accountIdentifier: user.payment?.accountIdentifier || "",
      },
    };
  }

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));
  const updatePayment = (key, value) =>
    setForm((prev) => ({
      ...prev,
      payment: { ...prev.payment, [key]: value },
    }));

  function validate() {
    if (editingSection === "personal") {
      if (!form.fullName.trim()) return "نام و نام‌خانوادگی را وارد کنید.";
      if (form.nationalCode && form.nationalCode.length !== 10)
        return "کد ملی باید ۱۰ رقم باشد.";
    }
    if (editingSection === "bank") {
      if (
        form.payment.debitCard_code &&
        form.payment.debitCard_code.length !== 16
      )
        return "شماره کارت باید ۱۶ رقم باشد.";
    }
    return null;
  }

  const updateProfile = async () => {
    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const [firstName, ...rest] = form.fullName.trim().split(" ");
      const lastName = rest.join(" ");

      const payload = {
        mobile: form.mobile,
        email: form.email,
        gender: form.gender,
        birthDate: form.birthDate,
        nationalCode: form.nationalCode,
        firstName,
        lastName,
        payment: form.payment,
      };

      await api.put("/user/profile", payload);

      await queryClient.invalidateQueries(["user"]);

      setMessage("✅ اطلاعات با موفقیت ذخیره شد.");
      setEditingSection(null);
    } catch (err) {
      console.error("update profile error", err);
      setMessage(
        err?.response?.data?.message || "❌ خطا در ذخیره اطلاعات کاربران.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (!user) return <p>کاربر یافت نشد.</p>;

  return (
    <div className="flex flex-col gap-10 w-full">
      {message && (
        <div
          className={`p-3 rounded-md border text-sm ${
            message.startsWith("✅")
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <ProfileSection
        title="اطلاعات حساب کاربری"
        name="account"
        editingSection={editingSection}
        setEditingSection={setEditingSection}
        saving={saving}
        onSubmit={updateProfile}
        onCancel={() => {
          setForm(populateForm(user));
          setEditingSection(null);
        }}
        content={
          <>
            <ProfileRow
              label="شماره موبایل:"
              editing={editingSection === "account"}
              value={toPersianNumber(form.mobile)}
              editableComponent={
                <input
                  className="input"
                  value={form.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                />
              }
            />
            <ProfileRow
              label="ایمیل:"
              editing={editingSection === "account"}
              value={form.email}
              editableComponent={
                <input
                  className="input"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              }
            />
          </>
        }
      />

      <ProfileSection
        title="اطلاعات شخصی"
        name="personal"
        editingSection={editingSection}
        setEditingSection={setEditingSection}
        saving={saving}
        onSubmit={updateProfile}
        onCancel={() => {
          setForm(populateForm(user));
          setEditingSection(null);
        }}
        content={
          <>
            <ProfileRow
              label="نام و نام‌ خانوادگی:"
              editing={editingSection === "personal"}
              value={form.fullName}
              editableComponent={
                <input
                  className="input"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                />
              }
            />
            <ProfileRow
              label="کد ملی:"
              editing={editingSection === "personal"}
              value={form.nationalCode}
              editableComponent={
                <input
                  className="input"
                  maxLength={10}
                  value={form.nationalCode}
                  onChange={(e) => updateField("nationalCode", e.target.value)}
                />
              }
            />
            <ProfileRow
              label="تاریخ تولد:"
              editing={editingSection === "personal"}
              value={form.birthDate}
              editableComponent={
                <input
                  type="date"
                  className="input"
                  value={form.birthDate}
                  onChange={(e) => updateField("birthDate", e.target.value)}
                />
              }
            />
            <ProfileRow
              label="جنسیت:"
              editing={editingSection === "personal"}
              value={form.gender || "—"}
              editableComponent={
                <select
                  className="input"
                  value={form.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                >
                  <option value="">انتخاب</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
              }
            />
          </>
        }
      />

      <ProfileSection
        title="اطلاعات بانکی"
        name="bank"
        editingSection={editingSection}
        setEditingSection={setEditingSection}
        saving={saving}
        onSubmit={updateProfile}
        onCancel={() => {
          setForm(populateForm(user));
          setEditingSection(null);
        }}
        content={
          <>
            <ProfileRow
              label="شماره کارت:"
              editing={editingSection === "bank"}
              value={form.payment.debitCard_code}
              editableComponent={
                <input
                  className="input"
                  value={form.payment.debitCard_code}
                  maxLength={16}
                  onChange={(e) =>
                    updatePayment("debitCard_code", e.target.value)
                  }
                />
              }
            />
            <ProfileRow
              label="شماره شبا:"
              editing={editingSection === "bank"}
              value={form.payment.shaba_code}
              editableComponent={
                <input
                  className="input"
                  value={form.payment.shaba_code}
                  maxLength={26}
                  onChange={(e) => updatePayment("shaba_code", e.target.value)}
                />
              }
            />
            <ProfileRow
              label="شماره حساب:"
              editing={editingSection === "bank"}
              value={form.payment.accountIdentifier}
              editableComponent={
                <input
                  className="input"
                  value={form.payment.accountIdentifier}
                  onChange={(e) =>
                    updatePayment("accountIdentifier", e.target.value)
                  }
                />
              }
            />
          </>
        }
      />
    </div>
  );
}

function ProfileSection({
  title,
  name,
  editingSection,
  setEditingSection,
  saving,
  onSubmit,
  onCancel,
  content,
}) {
  const editing = editingSection === name;
  return (
    <div className="border rounded-xl p-6">
      <div className="flex justify-between mb-8">
        <h2 className="font-semibold text-lg">{title}</h2>
        {!editing ? (
          <button
            onClick={() => setEditingSection(name)}
            className="flex items-center gap-2 text-[#009ECA] hover:text-[#007fa6]"
          >
            <Image src="/icons/edit-2.svg" alt="" width={16} height={16} />
            ویرایش
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              disabled={saving}
              onClick={onSubmit}
              className={`${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white px-6 py-1 rounded-md`}
            >
              {saving ? "در حال ذخیره..." : "تأیید"}
            </button>
            <button
              onClick={onCancel}
              disabled={saving}
              className="border border-green-600 text-green-600 px-6 py-1 rounded-md hover:bg-green-50"
            >
              انصراف
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[420px_420px] gap-y-6">{content}</div>
    </div>
  );
}

function ProfileRow({ label, editing, value, editableComponent }) {
  return (
    <div className="flex gap-8 items-center">
      <label className="whitespace-nowrap">{label}</label>
      {!editing ? <p>{value || "—"}</p> : editableComponent}
    </div>
  );
}
