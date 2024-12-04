"use client";
import { useDataContext } from "@/providers/data-provider";
import React, { useMemo } from "react";
import NoCourses from "@/components/main/NoCourses";
import SingleAttendanceStatus from "./single-attendance-status";
import { LoadingSpinner } from "@/components/global/load-spinner";

const WrapperToToday = ({
  currentSemester,
}: {
  currentSemester: string | undefined;
}) => {
  const { state, dispatch } = useDataContext();
  const semExist = state.semesterInfo.find(
    (item) => item.semester === currentSemester
  );
  const todayCoursesToShowFromSearch = useMemo(() => {
    if (state.searchParam === "") return state.todayCourses;
    return state.todayCourses.filter((course) =>
      course.IndivCourse.toLowerCase().includes(state.searchParam.toLowerCase())
    );
  }, [state.searchParam, state.todayCourses]);
  if (state.isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  if (state.todayCourses.length === 0 || !semExist) {
    return <NoCourses redirectUrl="/setting-page" />;
  }

  return (
    <div className="w-full lg:px-3 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center ">
      {todayCoursesToShowFromSearch.map((item) => (
        <SingleAttendanceStatus
          key={item.IndivCourse}
          course={item}
          user={state.user}
          semExist={semExist}
          todayCourses={state.todayCourses}
          dispatch={dispatch}
          isBackendProcessing={state.isBackendProcessing}
        />
      ))}
    </div>
  );
};

export default WrapperToToday;
