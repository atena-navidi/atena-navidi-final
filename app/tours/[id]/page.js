// travel-agency/app/tours/[id]/page.js

import { serverFetch } from "@/core/services/http";
import Image from "next/image";

import ReservedButton from "./ReservedButton";
import TourDuration from "@/core/utils/tourDuration";

async function TourDetailsPage({ params }) {
  const tourData = await serverFetch(`/tour/${(await params).id}`, null, {
    cache: "no-store",
  });

  return (
    <>
      <main className="max-w-6xl mx-auto p-6 ">
        <div className="border border-black/10 rounded-xl p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-[420px]">
              <Image
                src={tourData.image}
                alt={tourData.title}
                width={420}
                height={260}
                className="rounded-xl object-cover w-full h-[240px]"
              />
            </div>

            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold">{tourData.title}</h1>

              <p className="text-gray-600 mt-2">
                <TourDuration
                  startDate={tourData.startDate}
                  endDate={tourData.endDate}
                />
              </p>

              <div className="flex justify-center md:justify-start gap-8 mt-6 text-gray-500">
                <span className="flex gap-2">
                  <Image
                    src="/icons/user-tick.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  تورلیدر از مبدا{" "}
                </span>
                <span className="flex gap-2">
                  {" "}
                  <Image src="/icons/map.svg" width={24} height={24} alt="" />
                  برنامه سفر
                </span>
                <span className="flex gap-2">
                  <Image
                    src="/icons/medal-star.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  تضمین کیفیت
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="mt-6 text-3xl font-bold text-[#009ECA]">
                  {tourData.price?.toLocaleString("fa-IR")} تومان
                </div>

                <ReservedButton tourId={tourData.id} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-8 text-center pt-6">
            <div className="border-l border-black/10">
              <div className="flex items-center justify-center gap-2 p-1 text-[#444444]">
                <Image
                  src="/icons/routing-2.svg"
                  width={20}
                  height={20}
                  alt="مبدا"
                />
                <p className="text-gray-500">مبدا</p>
              </div>
              <p className="font-medium">{tourData.origin?.name}</p>
            </div>

            <div className="border-l border-black/10">
              <div className="flex items-center justify-center gap-2 p-1">
                <Image
                  src="/icons/calendar (1).svg"
                  width={20}
                  height={20}
                  alt="تاریخ رفت"
                />
                <p className="text-gray-500">تاریخ رفت</p>
              </div>
              <p className="font-medium">
                {new Date(tourData.startDate).toLocaleDateString("fa-IR")}
              </p>
            </div>

            <div className="border-l border-black/10">
              <div className="flex items-center justify-center gap-2 p-1">
                <Image
                  src="/icons/calendar-2.svg"
                  width={20}
                  height={20}
                  alt="تاریخ برگشت"
                />
                <p className="text-gray-500">تاریخ برگشت</p>
              </div>
              <p className="font-medium">
                {new Date(tourData.endDate).toLocaleDateString("fa-IR")}
              </p>
            </div>

            <div className="border-l border-black/10">
              <div className="flex items-center justify-center gap-2 p-1">
                <Image
                  src="/icons/bus.svg"
                  width={20}
                  height={20}
                  alt="حمل و نقل"
                />
                <p className="text-gray-500">حمل و نقل</p>
              </div>
              <p className="font-medium">{tourData.fleetVehicle}</p>
            </div>

            <div className="border-l border-black/10">
              <div className="flex items-center justify-center gap-2 p-1">
                <Image
                  src="/icons/profile-2user.svg"
                  width={20}
                  height={20}
                  alt="ظرفیت"
                />
                <p className="text-gray-500">ظرفیت</p>
              </div>
              <p className="font-medium">{tourData.capacity} نفر</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 p-1">
                <Image
                  src="/icons/security.svg"
                  width={20}
                  height={20}
                  alt="بیمه"
                />
                <p className="text-gray-500">بیمه</p>
              </div>

              <p className="font-medium">
                {tourData.insurance ? "دارد" : "ندارد"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default TourDetailsPage;
