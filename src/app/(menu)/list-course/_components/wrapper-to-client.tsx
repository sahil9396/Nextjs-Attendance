"use client";
import { useDataContext } from "@/providers/data-provider";
import React, { useMemo } from "react";
import SingleCardDisplay from "./single-card-display";
import NoCourses from "@/components/main/NoCourses";
import { LoadingSpinner } from "@/components/global/load-spinner";

const WrapperToClient = () => {
  const { state } = useDataContext();
  const searchParamsFilteredCoursesToday = useMemo(() => {
    if (state.searchParam === "") return state.todayCourses;
    return state.todayCourses.filter((course) =>
      course.IndivCourse.toLowerCase().includes(state.searchParam.toLowerCase())
    );
  }, [state.searchParam, state.todayCourses]);

  const searchParamsFilteredCoursesNotToday = useMemo(() => {
    if (state.searchParam === "") return state.notToday;
    return state.notToday.filter((course) =>
      course.IndivCourse.toLowerCase().includes(state.searchParam.toLowerCase())
    );
  }, [state.searchParam, state.notToday]);

  if (state.isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  if (state.todayCourses.concat(state.notToday).length === 0) {
    return <NoCourses redirectUrl="/setting-page" />;
  }

  return (
    <div className="w-full lg:px-3 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center ">
      {searchParamsFilteredCoursesToday.map((item) => (
        <SingleCardDisplay
          key={item.IndivCourse}
          course={item}
          fromWhichList={"true"}
        />
      ))}
      {searchParamsFilteredCoursesNotToday.map((item) => (
        <SingleCardDisplay
          key={item.IndivCourse}
          course={item}
          fromWhichList={"false"}
        />
      ))}
    </div>
  );
};

export default WrapperToClient;
