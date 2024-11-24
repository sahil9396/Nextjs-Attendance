import React, { Suspense } from "react";
import CreateCourse from "./_components/create-course";
import ProfilePage from "./_components/profile-page";
import SemChange from "./_components/sem-change";
import { getUserInfo } from "@/lib/all-server";
import NoCourses from "@/components/main/NoCourses";

type SearchParams = { [key: string]: string | undefined };

export const dynamic = 'force-dynamic'

const Settings = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { semester: currentSem } = searchParams;
  const user = await getUserInfo();
  if (!user) return <NoCourses />;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="lg:h-full">
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 gap-2">
          <div className="row-span-4 lg:row-span-2">
            <CreateCourse currentSemester={currentSem} />
          </div>
          <div className="row-span-4 lg:row-span-1">
            <ProfilePage currentSemester={currentSem} user={user} />
          </div>
          <div>
            <SemChange currentSemester={currentSem} user={user} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Settings;
