import React, { Suspense } from "react";
import WrapperToToday from "./_components/wrapper-for-toady";

type SearchParams = { [key: string]: string | undefined };

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const currentSemester = searchParams.semester;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WrapperToToday currentSemester={currentSemester} />
    </Suspense>
  );
};

export default Page;
