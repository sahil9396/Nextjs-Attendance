import React, { Suspense } from "react";
import WrapperToClient from "./_components/wrapper-to-client";
import { LoadingSpinner } from "@/components/global/load-spinner";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

const Courses = async () => {
  return <WrapperToClient />;
};

export default Courses;
