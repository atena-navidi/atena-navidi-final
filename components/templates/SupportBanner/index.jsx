import Image from "next/image";

export default function SupportBanner() {
  return (
    <section className="container mx-auto px-4 my-12 max-w-297">
      <div className="flex flex-col md:flex-row">
        
        <div className="w-full md:w-2/3 bg-[#28A745] flex md:flex-row items-center justify-between p-5 text-white
          rounded-t-2xl md:rounded-t-none md:rounded-r-2xl">
          
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-right">
            <h2 className="text-xl md:text-4xl font-extrabold">
              خرید تلفنی از <span className="text-[#10411B]">تورینو</span>
            </h2>

            <p className="opacity-90 text-l md:text-2xl">
              به هرکجا که میخواهید!
            </p>
          </div>

          <div className="relative w-1/3 h-10  md:w-52 md:h-32 mt-4 md:mt-0 overflow-visible">
            <Image
              src="/icons/man.svg"
              alt="support"
              width={308}
              height={225}
              className="object-contain scale-160 md:scale-100 -mt-9 md:-mt-1"
            />
          </div>
        </div>


        <div className="w-full md:w-1/3 bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-4 p-6
          rounded-b-2xl md:rounded-r-none md:rounded-l-2xl">
          
          <div className="flex items-center gap-2 text-gray-700">
            <span className="font-bold text-lg">۰۲۱-۱۸۴۰</span>
            <Image
              src="/icons/call.svg"
              width={24}
              height={24}
              alt="phone"
            />
          </div>

          <button className="bg-gray-800 text-white px-8 py-2 rounded-lg hover:bg-black transition">
            اطلاعات بیشتر
          </button>
        </div>
      </div>
    </section>
  );
}
