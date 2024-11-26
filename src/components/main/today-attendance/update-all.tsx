"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import CustomButton from "@/components/global/custom-button";
import { useDataContext } from "@/providers/data-provider";
import { updateAllCourses } from "@/app/(menu)/list-course/_actions/log-courses-server-functions";

const UpdateAllClasses = () => {
  // WIP : Note to self: Throw error if the access token is expired or tell the user to login again

  const pathName = usePathname().split("/").pop();
  const { state, dispatch } = useDataContext();
  const currentSem = useSearchParams().get("semester");

  if (pathName !== "today-mark-status" || state.todayCourses.length === 0)
    return null;

  const handleUpdateStatus = async (status: string) => {
    const semExist = state.semesterInfo.find(
      (sem) => sem.semester === currentSem
    );
    if (!semExist || !state.user) return;

    const courses = state.todayCourses.concat(state.notToday).map((course) => ({
      courseName: course.IndivCourse,
      status,
      prev: course[status as "present" | "absent" | "cancelled"],
      pre: course.present,
      ab: course.absent,
      can: course.cancelled,
    }));

    try {
      await updateAllCourses(semExist, state.user, status, courses);
      dispatch({
        type: "SET_TODAY_COURSES",
        payload: state.todayCourses.map((course) => ({
          ...course,
          [status]: (course[status] as number) + 1,
        })),
      });
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while updating status");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <CustomButton
        value="present"
        className="bg-green-500 hover:bg-green-600 text-white"
        content="All present"
        onClick={() => handleUpdateStatus("present")}
        disabled={
          state.isBackendProcessing
          //   || todayStatusDone.courseNames.length === todayCourses.length
        }
      />
      <CustomButton
        value="absent"
        className="bg-red-500 hover:bg-red-600 text-white"
        content="All absent"
        onClick={() => handleUpdateStatus("absent")}
        disabled={
          state.isBackendProcessing
          //   || todayStatusDone.courseNames.length === todayCourses.length
        }
      />
      <CustomButton
        value="cancelled"
        className="bg-yellow-500 hover:bg-yellow-600 text-white"
        content="All cancelled"
        onClick={() => handleUpdateStatus("cancelled")}
        // disabled={
        //   isBackendProcessing ||
        //   todayStatusDone.courseNames.length === todayCourses.length
        // }
      />
    </div>
  );
};

export default UpdateAllClasses;
