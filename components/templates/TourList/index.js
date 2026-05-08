"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function TourList({ toursData }) {
  const router = useRouter();

  if (!toursData) return <p>نتیجه‌ای وجود ندارد</p>;

  return (
    <main className="p-6">
      
      <h2 className="font-medium text-4xl mb-4">همه تورها</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {toursData.map((tour) => (
          <div
            key={tour.id}
            onClick={() => router.push(`/tours/${tour.id}`)}
            className="border border-black/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 bg-white cursor-pointer"
          >
            <Image
              src={tour.image}
              alt={tour.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-2xl font-medium text-[#282828]">
                {tour.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {tour.options.join(" - ").slice(0, 30)}...
              </p>
            </div>

            <div
              className="flex items-center justify-between px-4 py-3 border-t border-black/10"
              onClick={(e) => e.stopPropagation()} // جلوگیری از هدایت کارت وقتی دکمه رزرو زده می‌شود
            >
              <Link
                href={`/tours/${tour.id}`}
                className="bg-[#28A745] text-white rounded-sm w-[72px] h-8 flex items-center justify-center hover:bg-green-600"
              >
                رزرو
              </Link>

              <span className="text-[#009ECA] font-bold text-lg">
                {tour.price.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        ))}
      </div>
     

    </main>
  );
}

export default TourList;
