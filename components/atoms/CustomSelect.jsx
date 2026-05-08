"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder,
  icon,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-gray-700 text-lg md:text-2xl  md:border-l border-black/20"
      >
        <div className="flex items-center gap-2">
          {icon && <Image src={icon} width={20} height={20} alt="" />}
          <span>{value || placeholder}</span>
        </div>
      </button>

      {open && (
        <ul className="absolute left-13 mt-2 w-full bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((item) => (
            <li
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <Image
                src="/icons/location.svg"
                width={18}
                height={18}
                alt=""
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
