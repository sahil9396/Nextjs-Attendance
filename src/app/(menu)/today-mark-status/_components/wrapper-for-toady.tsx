"use client";
import { useDataContext } from "@/providers/data-provider";
import React from "react";
import NoCourses from "@/components/main/NoCourses";
import SingleAttendanceStatus from "./single-attendance-status";

const WrapperToToday = () => {
  const { state, dispatch } = useDataContext();

  if (state.todayCourses.concat(state.notToday).length === 0) {
    return <NoCourses />;
  }

  return (
    <div className="w-full px-3 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center ">
      {state.todayCourses.map((item) => (
        <SingleAttendanceStatus key={item.IndivCourse} course={item} />
      ))}
    </div>
  );
};

export default WrapperToToday;
