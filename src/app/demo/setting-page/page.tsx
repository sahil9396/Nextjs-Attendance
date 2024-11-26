import React from "react";
import CreateCourseDemo from "./_component/create-course-demo";
import ProfilePageDemo from "./_component/profile-page-demo";
import SemChange from "@/app/(menu)/setting-page/_components/sem-change";

const Settings = async () => {
  return (
    <div className="lg:h-full">
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 gap-2">
        <div className="row-span-4 lg:row-span-2 ">
          <CreateCourseDemo />
        </div>
        <div className="row-span-4 lg:row-span-1">
          <ProfilePageDemo />
        </div>
        <div>
          <SemChange />
        </div>
      </div>
    </div>
  );
};

export default Settings;
