"use client";

import Image from "next/image";
import Link from "next/link";
import { toPersianNumber } from "@/core/utils/number";
import { usePathname } from "next/navigation";

export default function Footer() {
  const supportNumber = "021-8574";
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className="mt-10 bg-white">
      {isHomePage && (
        <div className="text-center border-t border-black/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            <div className="flex items-center rounded-xl p-5 md:p-8 w-full md:w-auto">
              <Image
                src="/icons/Group 16.svg"
                width={80}
                height={80}
                alt="pic"
                className="object-contain"
              />
              <div className="text-right mr-4">
                <h4 className="font-semibold text-lg text-[#282828]">
                  بصرفه ترین قیمت
                </h4>
                <p className="text-sm text-[#282828] mt-1">
                  بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.
                </p>
              </div>
            </div>

            <div className="flex items-center rounded-xl p-5 w-full md:w-auto">
              <Image
                src="/icons/Group 17.svg"
                width={80}
                height={80}
                alt="pic"
                className="object-contain"
              />
              <div className="text-right mr-4">
                <h4 className="font-semibold text-lg text-[#282828]">
                  پشتیبانی
                </h4>
                <p className="text-sm text-[#282828] mt-1">
                  پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.
                </p>
              </div>
            </div>

            <div className="flex items-center rounded-xl p-5 w-full md:w-auto">
              <Image
                src="/icons/Group 18.svg"
                width={80}
                height={80}
                alt="pic"
                className="object-contain"
              />
              <div className="text-right mr-4">
                <h4 className="font-medium text-xl md:text-2xl text-[#282828]">
                  رضایت کاربران
                </h4>
                <p className="text-sm md:text-[16px] font-light text-[#282828] mt-1">
                  رضایت بیش از 10هزار کاربر از تور های ما.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full md:w-2/3 mx-auto border-t border-black/10 pt-8 pb-6 px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex justify-between md:justify-start gap-10 md:gap-30">
            <div className="flex flex-col gap-3">
              <h4 className="text-lg font-bold text-[#282828]">تورینو</h4>
              <ul className="flex flex-col gap-2 text-[#595959]">
                <li>
                  <Link href="/about">درباره ما</Link>
                </li>
                <li>
                  <Link href="/contact">تماس با ما</Link>
                </li>
                <li>
                  <Link href="/">چرا تورینو</Link>
                </li>
                <li>
                  <Link href="/">بیمه مسافرتی</Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-lg font-bold text-[#282828]">
                خدمات مشتریان
              </h4>
              <ul className="flex flex-col gap-2 text-[#595959]">
                <li>
                  <Link href="/">پشتیبانی آنلاین</Link>
                </li>
                <li>
                  <Link href="/">راهنمای خرید</Link>
                </li>
                <li>
                  <Link href="/">راهنمای استرداد</Link>
                </li>
                <li>
                  <Link href="/">پرسش و پاسخ</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-row-reverse items-center md:items-end gap-5 text-center md:text-right md:flex-col">
            <div className="flex flex-col items-center md:items-end gap-2">
              <Image
                src="/images/logo.png"
                alt="Torino"
                width={146}
                height={44}
                className="object-contain"
              />
              <p className="text-[#595959]">
                تلفن پشتیبانی:
                <span dir="ltr" className="inline-block mr-1">
                  {toPersianNumber(supportNumber)}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2">
              <Image
                src="/icons/state-airline.svg"
                alt="state"
                width={55}
                height={77}
              />
              <Image
                src="/icons/passenger-rights.svg"
                alt="rights"
                width={55}
                height={77}
              />
              <Image
                src="/icons/ecunion.svg"
                alt="ecunion"
                width={55}
                height={77}
              />
              <Image
                src="/icons/samandehi.svg"
                alt="samandehi"
                width={55}
                height={77}
              />
              <Image src="/icons/aira.svg" alt="aira" width={55} height={77} />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 pt-4 pb-3 px-4">
        <p className="text-center text-[#595959] text-sm">
          کلیه حقوق این وب سایت متعلق به تورینو میباشد.
        </p>
      </div>
    </footer>
  );
}
