import React, { Suspense } from "react";
import CreateCourse from "./_components/create-course";
import ProfilePage from "./_components/profile-page";
import SemChange from "./_components/sem-change";

export const dynamic = "force-dynamic";

const Settings = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="lg:h-full">
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 gap-2">
          <div className="row-span-4 lg:row-span-2">
            <CreateCourse />
          </div>
          <div className="row-span-4 lg:row-span-1">
            <ProfilePage />
          </div>
          <div>
            <SemChange />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Settings;
