import ImageSlider from "./ImageSlider";

export default function WhyTorino() {
  return (
    <section className="container mx-auto px-18 py-20">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-20">
        <div className="w-full lg:w-1/2 text-right">
          <div className="flex items-center  gap-3 mb-6">
            <span className="w-14 h-14 rounded-full bg-[linear-gradient(180deg,#28A745_0%,#10411B_100%)] flex items-center justify-center text-white text-4xl font-black">
              ?
            </span>
            <h2 className="text-3xl font-bold">
              چرا <span className="text-green-600">تورینو</span>؟
            </h2>
          </div>

          <h3 className="text-xl font-semibold mb-4">
            تور طبیعت‌گردی و تاریخی
          </h3>

          <p className="text-gray-600 leading-8">
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم‌گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <ImageSlider />
        </div>
      </div>
    </section>
  );
}
