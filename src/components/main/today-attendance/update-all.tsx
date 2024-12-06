"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import CustomButton from "@/components/global/custom-button";
import { useDataContext } from "@/providers/data-provider";
import { updateAllCourses } from "@/app/(menu)/list-course/_actions/log-courses-server-functions";

const UpdateAllClasses = () => {
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
      const reponse = await updateAllCourses(
        semExist,
        state.user,
        status,
        courses
      );
      if (reponse === "Failed") {
        toast.error("Failed to update status, sign out and try again");
        return;
      }
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

  const buttonList = [
    {
      value: "present",
      className: "lg:hover:bg-green-600",
      content: "All present",
    },
    {
      value: "absent",
      className: "lg:hover:bg-red-600",
      content: "All absent",
    },
    {
      value: "cancelled",
      className: "lg:hover:bg-yellow-600",
      content: "All cancelled",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      {buttonList.map((button) => (
        <CustomButton
          key={button.value}
          value={button.value}
          className={`bg-white text-black lg:hover:text-white ${button.className}`}
          content={button.content}
          onClick={() => handleUpdateStatus(button.value)}
          disabled={
            state.isBackendProcessing
            //   || todayStatusDone.courseNames.length === todayCourses.length
          }
        />
      ))}
    </div>
  );
};

export default UpdateAllClasses;
