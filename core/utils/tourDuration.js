// travel-agency/components/TourDuration.js

"use client";

import React from "react";
import { toPersianNumber } from "@/core/utils/number";

export default function TourDuration({ startDate, endDate, showLabel = true }) {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const days = diffDays + 1;
  const nights = diffDays;

  const daysFa = toPersianNumber(days);
  const nightsFa = toPersianNumber(nights);

  return (
    <span className="text-gray-600 mt-2">
      {showLabel ? `${daysFa} روز و ${nightsFa} شب` : `${daysFa}/${nightsFa}`}
    </span>
  );
}
