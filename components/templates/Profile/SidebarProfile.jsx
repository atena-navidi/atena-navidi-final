// travel-agency/components/profile/SidebarProfile.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarProfile() {
  const pathname = usePathname();

  const menus = [
    { title: "پروفایل", href: "/profile", icon: "/icons/profile.svg" },
    {
      title: "تورهای من",
      href: "/profile/my-tours",
      icon: "/icons/sun-fog.svg",
    },
    {
      title: "تراکنش‌ها",
      href: "/profile/transactions",
      icon: "/icons/convert-card.svg",
    },
  ];

  return (
    <aside className="w-80 h-40 bg-white rounded-xl overflow-hidden border border-black/10">
      {menus.map((m, index) => {
        const active = pathname === m.href;

        return (
          <Link
            key={m.href}
            href={m.href}
            className={`px-5 py-4 transition text-sm block
              ${active ? "bg-[#E7F4EA] text-[#28A745] font-bold" : "text-gray-700 hover:bg-gray-50"}
              ${index !== 0 ? "border-t border-black/10" : ""}
            `}
          >
            <div className="flex items-center gap-2">
              <img src={m.icon} className="w-5 h-5" alt={m.title} />
              <span>{m.title}</span>
            </div>
          </Link>
        );
      })}
    </aside>
  );
}
