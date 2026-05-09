"use client";

import { DatePicker } from "zaman";
import { useMemo } from "react";
import Image from "next/image";
import CustomSelect from "@/components/atoms/CustomSelect";

function SearchTour({ tours = [], filters, setFilters, onSearch }) {
  const safeTours = useMemo(() => {
    if (!Array.isArray(tours)) return [];
    return tours.filter(
      (tour) => tour && tour.origin?.name && tour.destination?.name,
    );
  }, [tours]);

  const origins = useMemo(() => {
    return [...new Set(safeTours.map((tour) => tour.origin.name))];
  }, [safeTours]);

  const destinations = useMemo(() => {
    return [...new Set(safeTours.map((tour) => tour.destination.name))];
  }, [safeTours]);

  const formatDate = (date) => {
    if (!date) return "";
    return date.toISOString().slice(0, 10);
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="bg-white shadow-md rounded-3xl px-4 py-4 flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl">
        <div className="flex w-full ">
          <div className="flex items-center gap-2 border border-black/20 px-3 py-2 m-1 rounded-2xl md:border-none w-1/2">
            <Image src="/icons/location.svg" width={20} height={20} alt="" />

            <CustomSelect
              options={origins}
              value={filters.origin}
              placeholder="مبدا"
              onChange={(val) =>
                setFilters((prev) => ({ ...prev, origin: val }))
              }
            />
          </div>

          <div className="flex items-center gap-2 border border-black/20 px-3 py-2 m-1 rounded-2xl md:border-none w-1/2">
            <Image
              src="/icons/global-search.svg"
              width={20}
              height={20}
              alt=""
            />

            <CustomSelect
              options={destinations}
              value={filters.destination}
              placeholder="مقصد"
              onChange={(val) =>
                setFilters((prev) => ({ ...prev, destination: val }))
              }
            />
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-center border border-black/20 rounded-2xl px-3 py-2 md:w-1/3 md:border-none md:justify-end md:gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <Image src="/icons/calendar.svg" width={20} height={20} alt="" />
            <label className="text-lg md:text-2xl">تاریخ</label>
          </div>

          <DatePicker
            range
            onChange={(value) => {
              setFilters((prev) => ({
                ...prev,
                startDate: formatDate(value?.from),
                endDate: formatDate(value?.to),
              }));
            }}
            className="w-full md:w-50"
          />
        </div>

        <button
          onClick={() => onSearch(filters)}
          className="bg-green-600 text-white font-semibold rounded-2xl py-3 w-full md:w-1/3 px-7 hover:bg-green-700 transition"
        >
          جستجو
        </button>
      </div>
    </div>
  );
}

export default SearchTour;
