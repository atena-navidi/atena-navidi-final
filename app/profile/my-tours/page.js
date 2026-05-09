"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/core/config/api";
import { FaTrain } from "react-icons/fa";

export default function MyToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get("/user/tours");
        setTours(response.data);
      } catch (error) {
        console.error(
          "خطا در دریافت تورها:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) return <div className="p-6">در حال بارگذاری...</div>;

  if (!tours.length)
    return <div className="p-6 text-gray-500">هنوز توری رزرو نکرده‌اید.</div>;

  function getVehicle(vehicle) {
    const v = vehicle?.toLowerCase();

    if (v === "suv" || v === "bus") {
      return (
        <div className="flex items-center gap-2">
          <Image src="/icons/bus.svg" width={24} height={24} alt="bus" />
          <span>سفر با اتوبوس</span>
        </div>
      );
    }

    if (v === "airplane") {
      return (
        <div className="flex items-center gap-2">
          <Image
            src="/icons/airplane.svg"
            width={24}
            height={24}
            alt="airplane"
          />
          <span>سفر با هواپیما</span>
        </div>
      );
    }

    if (v === "ship") {
      return (
        <div className="flex items-center gap-2">
          <Image src="/icons/ship.svg" width={24} height={24} alt="ship" />
          <span>سفر با کشتی</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <FaTrain />
        <span>سفر با قطار</span>
      </div>
    );
  }

  return (
    <div className="border border-black/10 rounded-lg p-2">
      {tours.map((tour, index) => (
        <div
          key={`${tour.id}-${index}`}
          className="border border-black/20 rounded-lg m-2 bg-white"
        >
          <div className="flex items-center justify-between mb-2 p-6">
            <div className="flex flex-row-reverse items-center gap-2">
              {tour.title}
              <Image src="/icons/sun-fog.svg" width={24} height={24} alt="" />
            </div>
            <div className="flex items-center gap-2">
              {getVehicle(tour.fleetVehicle)}
            </div>

            <div
              className={`text-sm px-3 py-1 rounded ${
                tour.status === "done"
                  ? "bg-green-50 text-green-600"
                  : tour.status === "pending"
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {tour.status === "done"
                ? "به اتمام رسیده"
                : tour.status === "pending"
                  ? "در حال برگزاری"
                  : "رزرو شده"}
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-1 p-6">
            <div>
              <strong>مسیر:</strong> {tour.origin.name} →{" "}
              {tour.destination.name}
            </div>
            <div>
              <strong>تاریخ رفت:</strong>{" "}
              {new Date(tour.startDate).toLocaleDateString("fa-IR")}
              <strong>تاریخ برگشت:</strong>{" "}
              {new Date(tour.endDate).toLocaleDateString("fa-IR")}
            </div>
          </div>
          <div className="border-t border-black/20 p-6 flex flex-row-reverse items-center justify-end gap-3">
            <div className="p-3 border-r border-black/20 flex gap-2">
              <p className="text-gray-500">مبلغ پرداخت‌شده:</p>
              {tour.price.toLocaleString("fa-IR")} تومان
            </div>
            <div className="flex gap-2">
              <p className="text-gray-500">شماره تور:</p> 
              {tour.id}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
