"use client";
import { deleteCourse } from "@/app/(menu)/list-course/_actions/log-courses-server-functions";
import CustomButton from "@/components/global/custom-button";
import { inputData } from "@/lib/type";
import {
  ActionType,
  contextype,
  SingleSemester,
  useDataContext,
} from "@/providers/data-provider";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch } from "react";
import { toast } from "sonner";

type Props = {
  state: contextype;
  dispatch: Dispatch<ActionType>;
  selected: string;
  today: string | null;
};

const CourseDelete = ({ selected, today }: Props) => {
  const { state, dispatch } = useDataContext();
  const currentSem = useSearchParams().get("semester");
  const route = useRouter();
  const handleDelete = async () => {
    const semExists = state.semesterInfo.find(
      (sem: SingleSemester) => sem.semester === currentSem
    );
    if (!semExists || !selected) {
      toast.error("Semester not found");
      return;
    }
    toast.message(
      "Course is being updated, please wait for the process to complete"
    );

    try {
      await deleteCourse(semExists, state.user, selected);
      if (today === "true") {
        const updatedList = state.todayCourses.filter(
          (course: inputData) => course.IndivCourse !== selected
        );

        dispatch({
          type: "SET_TODAY_COURSES",
          payload: updatedList,
        });
      } else {
        const updatedList = state.notToday.filter(
          (course: inputData) => course.IndivCourse !== selected
        );
        dispatch({
          type: "SET_NOT_TODAY",
          payload: updatedList,
        });
      }
      route.push(`?semester=${currentSem}`);
      toast.success(`Course deleted successfully ${selected} ${today}`);
    } catch (error) {
      toast.error("Error occurred while deleting course");
      console.error(error);
    }
  };

  return (
    <CustomButton
      size={"sm"}
      className="bg-red-600 hover:bg-red-700 w-full text-white dark:bg-red-500 dark:hover:bg-red-400"
      onClick={handleDelete}
      disabled={state.isBackendProcessing}
      content="Delete"
    />
  );
};

export default CourseDelete;
