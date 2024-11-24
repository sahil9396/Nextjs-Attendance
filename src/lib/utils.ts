import { clsx, type ClassValue } from "clsx";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const custom_cache = (cb: any, key: any[], tags: any) =>
  unstable_cache(cache(cb), key, tags);
