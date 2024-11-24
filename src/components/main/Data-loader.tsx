"use client";
import { useDataLoader } from "@/lib/data-loader";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = { children: React.ReactNode };

const DataLoader = ({ children }: Props) => {
  const currentPath = usePathname();
  const extractedSem = useSearchParams().get("semester");
  useDataLoader(extractedSem);
  console.log(currentPath, extractedSem, "From data loader");
  return <>{children}</>;
};

export default DataLoader;
