import { clsx, type ClassValue } from "clsx";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Callback = (...args: any[]) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
export function custom_cache<T extends Callback>(
  cb: T,
  key: string[],
  tags: { [key: string]: string | string[] | number } = {}
): T {
  return unstable_cache(cache(cb), key, tags);
}
