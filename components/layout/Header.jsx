"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import AuthForm from "@/components/templates/AuthForm";
import useGetUserDate from "@/core/services/queries";
import { toPersianNumber } from "@/core/utils/number";
import { removeCookie } from "@/core/utils/cookie";
import api from "@/core/config/api";

export default function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // منوی پروفایل
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // منوی همبرگری
  const menuRef = useRef(null);

  const { data } = useGetUserDate();
  const user = data?.data;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    api.isLoggedOut = true;
    removeCookie("accessToken");
    removeCookie("refreshToken");
    queryClient.removeQueries({ queryKey: ["user-data"] });
    setIsMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-black/5 shadow-sm">
        <div className="container mx-auto px-4 h-18.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Image
                src="/icons/Hamburger.svg"
                width={24}
                height={24}
                alt="menu"
              />
            </button>

            <Link href="/" className="hidden md:block">
              <Image
                src="/icons/Torino.svg"
                alt="Torino Logo"
                width={146}
                height={44}
                className="object-contain"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8 mr-10">
              <Link href="/" className="text-[#28A745] font-medium">
                صفحه اصلی
              </Link>
              <Link
                href="/"
                className="text-[#595959] hover:text-[#28A745] transition"
              >
                خدمات گردشگری
              </Link>
              <Link
                href="/about"
                className="text-[#595959] hover:text-[#28A745] transition"
              >
                درباره ما
              </Link>
              <Link
                href="/contact"
                className="text-[#595959] hover:text-[#28A745] transition"
              >
                تماس با ما
              </Link>
            </nav>
          </div>

          <div>
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-1 text-[#28A745] font-bold md:px-8 py-2 rounded-lg"
                >
                  <Image
                    src="/icons/profile.svg"
                    width={20}
                    height={20}
                    alt="user"
                  />
                  <span>{toPersianNumber(String(user.mobile))}</span>
                  <Image
                    src="/icons/arrow-down.svg"
                    width={20}
                    height={20}
                    alt="arrow"
                  />
                </button>

                {isMenuOpen && (
                  <div className="absolute left-0 w-56 mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-4 flex items-center gap-3 bg-[#F4F4F4]">
                      <Image
                        src="/icons/profile-(2).svg"
                        width={16}
                        height={16}
                        alt="user icon"
                      />
                      <span className="font-semibold">
                        {toPersianNumber(String(user.mobile))}
                      </span>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition"
                    >
                      <Image
                        src="/icons/profile-(1).svg"
                        width={18}
                        height={18}
                        alt="profile"
                      />
                      <span>اطلاعات حساب کاربری</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 w-full text-red-600 hover:bg-red-50 transition"
                    >
                      <Image
                        src="/icons/logout.svg"
                        width={18}
                        height={18}
                        alt="logout"
                      />
                      <span>خروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setAuthStep(1);
                }}
                className="flex items-center justify-center gap-2 md:w-40 h-10 px-3 md:px-4 rounded-xl border-2 border-[#28A745] text-[#28A745] font-bold hover:bg-gray-50 transition"
              >
                <Image
                  src="/icons/profile.svg"
                  width={20}
                  height={20}
                  alt="login"
                  className="hidden md:block"
                />
                <Image
                  src="/icons/login.svg"
                  width={20}
                  height={20}
                  alt="login"
                  className="block md:hidden"
                />

                <span className="hidden md:block">ورود | ثبت نام</span>
              </button>
            )}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-18 right-0 w-2/3 bg-white rounded-b-lg shadow-xl p-6 flex flex-col gap-6 z-100 animate-in slide-in-from-right">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#28A745] font-bold  pb-2"
            >
              صفحه اصلی
            </Link>
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#595959]  pb-2"
            >
              خدمات گردشگری
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#595959]  pb-2"
            >
              درباره ما
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#595959] pb-2"
            >
              تماس با ما
            </Link>
          </div>
        )}
      </header>

      <AuthForm
        isOpen={isAuthModalOpen}
        setIsOpen={setIsAuthModalOpen}
        step={authStep}
        setStep={setAuthStep}
      />
    </>
  );
}
