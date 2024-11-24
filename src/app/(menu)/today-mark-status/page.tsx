import React, { Suspense } from "react";
import { getTodaysList } from "./_actions/getTodaysList";
import NoCourses from "@/components/main/NoCourses";
import SingleAttendanceStatus from "./_components/single-attendance-status";
import { inputData } from "@/lib/type";
import { getSemesterList, getUserInfo } from "@/lib/all-server";
import WrapperToToday from "./_components/wrapper-for-toady";

type SearchParams = { [key: string]: string | undefined };

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WrapperToToday />
    </Suspense>
  );
};

export default Page;
