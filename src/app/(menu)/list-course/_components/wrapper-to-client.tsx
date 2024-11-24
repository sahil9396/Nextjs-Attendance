"use client";
import { useDataContext } from "@/providers/data-provider";
import React from "react";
import SingleCardDisplay from "./single-card-display";
import NoCourses from "@/components/main/NoCourses";

const WrapperToClient = () => {
  const { state, dispatch } = useDataContext();

  if (state.todayCourses.concat(state.notToday).length === 0) {
    return <NoCourses />;
  }

  return (
    <div className="w-full px-3 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center ">
      {state.todayCourses.concat(state.notToday).map((item) => (
        <SingleCardDisplay key={item.IndivCourse} course={item} />
      ))}
    </div>
  );
};

export default WrapperToClient;
