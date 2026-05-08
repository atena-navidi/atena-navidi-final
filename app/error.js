"use client";

import Image from "next/image";

export default function Error({ error, reset }) {
  return (
    <main
      className="container mx-auto px-4 min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-10 py-20 text-right"
      dir="rtl"
    >
      <div className="flex flex-col items-center md:items-start gap-8 order-2 md:order-1">
        <h2 className="text-3xl md:text-4xl font-black text-[#282828]">
          اتصال با سرور برقرار نیست!
        </h2>
        <p className="text-xl text-[#595959]">لطفا بعدا دوباره امتحان کنید.</p>
        <button
          onClick={() => reset()}
          className="mt-4 text-[#28A745] border-b border-[#28A745] font-bold"
        >
          تلاش مجدد
        </button>
      </div>

      <div className="w-full max-w-[450px] order-1 md:order-2">
        <Image
          src="/icons/ErrorLampRobot.svg"
          alt="Server Connection Error"
          width={500}
          height={400}
          className="w-full h-auto object-contain"
        />
      </div>
    </main>
  );
}
