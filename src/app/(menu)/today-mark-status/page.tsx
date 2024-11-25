import React, { Suspense } from "react";
import WrapperToToday from "./_components/wrapper-for-toady";
import { LoadingSpinner } from "@/components/global/load-spinner";

type SearchParams = { [key: string]: string | undefined };

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const currentSemester = searchParams.semester;
  return <WrapperToToday currentSemester={currentSemester} />;
};

export default Page;
