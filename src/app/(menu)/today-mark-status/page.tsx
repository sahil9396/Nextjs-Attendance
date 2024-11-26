import React from "react";
import WrapperToToday from "./_components/wrapper-for-toady";

type SearchParams = { [key: string]: string | undefined };

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const currentSemester = searchParams.semester;
  return <WrapperToToday currentSemester={currentSemester} />;
};

export default Page;
