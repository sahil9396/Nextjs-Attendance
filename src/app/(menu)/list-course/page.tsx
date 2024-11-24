import React, { Suspense } from "react";
import WrapperToClient from "./_components/wrapper-to-client";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

const Courses = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WrapperToClient />
    </Suspense>
  );
};

export default Courses;
