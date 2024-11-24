import { clsx, type ClassValue } from "clsx";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const todayCourseDecider = 1;
// export const todayCourseDecider = new Date().getDay();

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const custom_cache = (cb: any, key: any[], tags: any) =>
  unstable_cache(cache(cb), key, tags);
