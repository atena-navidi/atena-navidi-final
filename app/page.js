"use client";

import { useMemo, useState } from "react";
import HeroSection from "@/components/templates/HeroSection/HeroSection";
import SupportBanner from "@/components/templates/SupportBanner";
import TourList from "@/components/templates/TourList";
import WhyTorino from "@/components/templates/WhyUs/WhyTorino";
import SearchTour from "@/components/templates/HeroSection/SearchTour";
import { useGetTours } from "@/core/services/queries";

export default function Home() {
  const { data: tours = [], isLoading, isError } = useGetTours();

  const [filters, setFilters] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [searchFilters, setSearchFilters] = useState(null);

const filteredTours = useMemo(() => {
  if (!searchFilters) return tours; // تا وقتی سرچ نزده، همه تورها را نمایش بده

  const f = searchFilters;

  return tours.filter((tour) => {
    if (f.origin && tour.origin.name !== f.origin) return false;
    if (f.destination && tour.destination.name !== f.destination) return false;

    if (f.startDate && tour.startDate.slice(0, 10) < f.startDate) return false;
    if (f.endDate && tour.endDate.slice(0, 10) > f.endDate) return false;

    return true;
  });
}, [tours, searchFilters]);


  const handleSearch = (f) => {
  setSearchFilters(f);
};


  if (isLoading) {
    return <p className="text-center py-10">در حال بارگذاری...</p>;
  }

  if (isError) {
    return <p className="text-center py-10">خطا در دریافت تورها</p>;
  }

  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <SearchTour
          tours={tours}
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
        />
        <TourList toursData={filteredTours} />
      </div>
      <SupportBanner />
      <WhyTorino />
    </>
  );
}
