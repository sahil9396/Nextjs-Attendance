"use client";
import { useDataLoader } from "@/lib/data-loader";
import React from "react";
import { useSearchParams } from "next/navigation";

type Props = { children: React.ReactNode };

export const dynamic = "force-dynamic";

const DataLoader = ({ children }: Props) => {
  const params = useSearchParams();
  const extractedSem = params.get("semester");
  useDataLoader(extractedSem);
  return (
    <div
      className={`w-full h-full bg-[radial-gradient(circle_at_57%_36%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_10%,_transparent_10%,_transparent_100%),_radial-gradient(circle_at_22%_61%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_36%,_transparent_36%,_transparent_100%),_radial-gradient(circle_at_68%_97%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_41%,_transparent_41%,_transparent_100%),_radial-gradient(circle_at_57%_89%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_30%,_transparent_30%,_transparent_100%),_radial-gradient(circle_at_39%_80%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_22%,_transparent_22%,_transparent_100%),_radial-gradient(circle_at_88%_71%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_30%,_transparent_30%,_transparent_100%),_linear-gradient(0deg,_rgb(255,255,255),_rgb(255,255,255))] dark:bg-gradient-to-b dark:from-black dark:to-gray-800`}
    >
      {children}
    </div>
  );
};

export default DataLoader;
