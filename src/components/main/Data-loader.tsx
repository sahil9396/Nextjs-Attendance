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
      className={`w-full h-full bg-white dark:bg-gradient-to-b dark:from-black dark:to-gray-800`}
    >
      {children}
    </div>
  );
};

export default DataLoader;
