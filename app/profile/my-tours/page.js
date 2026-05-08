"use client";

import { useEffect, useState } from "react";
import api from "@/core/config/api";

export default function MyToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get("/user/tours"); 
        setTours(response.data);
      } catch (error) {
        console.error("خطا در دریافت تورها:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) return <div className="p-6">در حال بارگذاری...</div>;

  if (!tours.length)
    return <div className="p-6 text-gray-500">هنوز توری رزرو نکرده‌اید.</div>;

  return (
    <div className="border border-black/10 rounded-lg p-2">


      {tours.map((tour, index) => (
  <div
    key={`${tour.id}-${index}`}
    className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
  >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">{tour.name}</h3>
            <span
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
            </span>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>{tour.title}</p>
            <p>
              <strong>مسیر:</strong> {tour.origin.name} → {tour.destination.name}
            </p>
            <p>
              <strong>تاریخ رفت:</strong> {new Date(tour.startDate).toLocaleDateString("fa-IR")}
              <strong>تاریخ برگشت:</strong>{" "}
              {new Date(tour.endDate).toLocaleDateString("fa-IR")}
            </p>
            <p>
              <strong>وسیله سفر:</strong> {tour.fleetVehicle}
            </p>
            <p>
              <strong>مبلغ پرداخت‌شده:</strong>{" "}
              {tour.price.toLocaleString("fa-IR")} تومان
            </p>
            <p className="text-gray-500">شماره تور: {tour.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
