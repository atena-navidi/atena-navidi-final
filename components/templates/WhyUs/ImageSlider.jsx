"use client";

import { useState } from "react";
import Image from "next/image";

import { toPersianNumber } from "@/core/utils/number";

const images = [
  "/images/slide1.png",
  "/images/slide2.png",
  "/images/slide3.png",
  "/images/slide4.png",
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full flex justify-center">
      <div className="relative w-[320px] h-105">

        {images.map((img, i) => {
          const layer =
            (i - index + images.length) % images.length;

          if (layer > 3) return null; 

          return (
            <div
              key={img}
              className="absolute inset-0 transition-all duration-500"
              style={{
                transform: `
                  translateX(${-layer * 20}px)
                  scale(${1 - layer * 0.05})
                `,
                zIndex: 10 - layer,
                opacity: layer === 0 ? 1 : 0.5,
              }}
            >
              <Image
                src={img}
                alt=""
                fill
                className="rounded-3xl object-cover"
              />
            </div>
          );
        })}
      </div>

      <div className="absolute -bottom-12 flex items-center gap-6 text-gray-500">
        <button onClick={next}>
          <Image 
          src="/icons/arrow-right.svg"
          width={20}
          height={20}
          alt="arrow"
          />
        </button>
         <span dir="rtl">
          {toPersianNumber(index + 1)} / {toPersianNumber(images.length)}
        </span>
         <button onClick={prev}>
          <Image 
          src="/icons/arrow-left.svg"
          width={20}
          height={20}
          alt="arrow"
          />
        </button>
      </div>
    </div>
  );
}
