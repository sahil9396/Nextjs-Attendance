"use client";
import SingleCardDisplay from "@/app/(menu)/list-course/_components/single-card-display";
import NoCourses from "@/components/main/NoCourses";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import React, { useMemo } from "react";

const Page = () => {
  const { state } = useDemoDataContext();

  const demoSearchParamsFilteredCoursesToday = useMemo(() => {
    if (state.demoSearchParam === "") return state.demoTodayCourses;
    return state.demoTodayCourses.filter((course) =>
      course.IndivCourse.toLowerCase().includes(
        state.demoSearchParam.toLowerCase()
      )
    );
  }, [state.demoSearchParam, state.demoTodayCourses]);

  const demoSearchParamsFilteredCoursesdemoNotToday = useMemo(() => {
    if (state.demoSearchParam === "") return state.demoNotToday;
    return state.demoNotToday.filter((course) =>
      course.IndivCourse.toLowerCase().includes(
        state.demoSearchParam.toLowerCase()
      )
    );
  }, [state.demoSearchParam, state.demoNotToday]);

  if (state.demoTodayCourses.length + state.demoNotToday.length === 0) {
    return <NoCourses redirectUrl="/demo/setting-page" />;
  }

  return (
    <div className="w-full lg:px-3 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center ">
      {demoSearchParamsFilteredCoursesToday.map((item) => (
        <SingleCardDisplay
          key={item.IndivCourse}
          course={item}
          fromWhichList={"true"}
        />
      ))}
      {demoSearchParamsFilteredCoursesdemoNotToday.map((item) => (
        <SingleCardDisplay
          key={item.IndivCourse}
          course={item}
          fromWhichList={"false"}
        />
      ))}
    </div>
  );
};

export default Page;
