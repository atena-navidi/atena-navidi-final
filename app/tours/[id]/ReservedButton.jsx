"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/core/config/api";
import  useGetUserData  from "@/core/services/queries";

export default function ReserveButton({ tourId }) {
  const router = useRouter();
  const { data: userResponse } = useGetUserData();
  const user = userResponse?.data?.data || userResponse?.data; 
  const [loading, setLoading] = useState(false);

  const handleReserve = async () => {
    if (
      !user?.nationalCode ||
      !user?.firstName ||
      !user?.lastName ||
      !user?.gender ||
      !user?.birthDate
    ) {
      router.push(`/tours/${tourId}/passenger`);
      return;
    }

    const body = {
      nationalCode: user.nationalCode,
      fullName: `${user.firstName} ${user.lastName}`,
      gender: user.gender,
      birthDate: user.birthDate,
    };

    console.log("FINAL BODY:", body);

    try {
      setLoading(true);
      await api.put(`/basket/${tourId}`);
      await api.post("/order", body);
      alert("رزرو با موفقیت انجام شد");
      router.push("/profile/my-tours");
    } catch (error) {
      console.log("ORDER ERROR:", error.response?.data);
      alert(error.response?.data?.message || "خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReserve}
      disabled={loading}
      className="mt-4 bg-green-600 text-white px-8 py-3 rounded-lg"
    >
      {loading ? "در حال رزرو..." : "رزرو و خرید"}
    </button>
  );
}
