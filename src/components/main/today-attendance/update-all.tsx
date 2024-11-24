"use client";
import React from "react";
import { usePathname } from "next/navigation";
// import { updateMultipleCoursesStatus } from "../utils/getData";
import { toast } from "sonner";
import CustomButton from "@/components/global/custom-button";
import { useDataContext } from "@/providers/data-provider";

const UpdateAllClasses = () => {
  // WIP : Note to self: Throw error if the access token is expired or tell the user to login again

  const pathName = usePathname().split("/").pop();
  const { state, dispatch } = useDataContext();
  
  if (
    pathName !== "today-mark-status" ||
    state.todayCourses.concat(state.notToday).length === 0
  )
    return null;
  return (
    <div className="flex flex-col gap-2 w-full">
      <CustomButton
        value="present"
        className="bg-green-500 hover:bg-green-600 text-white"
        content="All present"
        // onClick={() => handleUpdateStatus("present")}
        // disabled={
        //   isBackendProcessing ||
        //   todayStatusDone.courseNames.length === todayCourses.length
        // }
      />
      <CustomButton
        value="absent"
        className="bg-red-500 hover:bg-red-600 text-white"
        content="All absent"
        // onClick={() => handleUpdateStatus("absent")}
        // disabled={
        //   isBackendProcessing ||
        //   todayStatusDone.courseNames.length === todayCourses.length
        // }
      />
      <CustomButton
        value="cancelled"
        className="bg-yellow-500 hover:bg-yellow-600 text-white"
        content="All cancelled"
        // onClick={() => handleUpdateStatus("cancelled")}
        // disabled={
        //   isBackendProcessing ||
        //   todayStatusDone.courseNames.length === todayCourses.length
        // }
      />
    </div>
  );
};

export default UpdateAllClasses;
