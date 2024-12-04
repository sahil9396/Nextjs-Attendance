"use client";
import React, { useMemo } from "react";
import SingleAttendanceStatusDemo from "./_component/SingleAttendanceStatusDemo";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import NoCourses from "@/components/main/NoCourses";

const Page = () => {
  const { state, dispatch } = useDemoDataContext();
  const currentSemester = "semester-1";
  const semExist = state.demoSemesterInfo.find(
    (item) => item.semester === currentSemester
  );
  const demoTodayCoursesToShowFromSearch = useMemo(() => {
    if (state.demoSearchParam === "") return state.demoTodayCourses;
    return state.demoTodayCourses.filter((course) =>
      course.IndivCourse.toLowerCase().includes(
        state.demoSearchParam.toLowerCase()
      )
    );
  }, [state.demoSearchParam, state.demoTodayCourses]);
  if (state.demoTodayCourses.length === 0 || !semExist) {
    return <NoCourses redirectUrl="/demo/setting-page" />;
  }
  return (
    <div className="w-full px-3 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center ">
      {demoTodayCoursesToShowFromSearch.map((item) => (
        <SingleAttendanceStatusDemo
          key={item.IndivCourse}
          course={item}
          user={state.demoUser}
          semExist={semExist}
          todayCourses={state.demoTodayCourses}
          dispatch={dispatch}
          isBackendProcessing={state.demoIsBackendProcessing}
        />
      ))}
    </div>
  );
};

export default Page;
