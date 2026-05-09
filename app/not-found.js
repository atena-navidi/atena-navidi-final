import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-10 py-20">
      <div className="flex flex-col gap-8 max-w-full items-center md:items-start justify-between order-2 md:order-1">
        <h1 className="text-3xl md:text-4xl font-black text-[#282828]">
          صفحه مورد نظر یافت نشد!
        </h1>
        <Link
          href="/"
          className="bg-[#E9F6ED] text-[#28A745] px-10 py-3 rounded-2xl font-bold text-lg hover:bg-[#28A745] hover:text-white transition-all shadow-sm"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>

      <div className="w-full max-w-[450px] order-1 md:order-2">
        <Image
          src="/icons/ErrorTV.svg"
          alt="404 Not Found"
          width={500}
          height={400}
          className="w-full h-auto object-contain"
        />
      </div>
    </main>
  );
}
