import Image from "next/image";


export default function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="relative w-full h-30  md:h-105">
        <Image
          src="/images/Banner.jpg" 
          alt="Torino Banner"
          fill
          priority
          className="object-fill"
        />
      </div>

      <div className="inset-0 flex flex-col items-center justify-end p-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          <span className="text-green-600">تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
        </h1>
      </div>
    </section>
  );
}
