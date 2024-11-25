"use client";
import CustomButton from "@/components/global/custom-button";
import { inputData } from "@/lib/type";
import { useDataContext } from "@/providers/data-provider";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { toast } from "sonner";
import { deleteAllCard, resetAllCard } from "../_actions/mutate-course-action";

const MutateCourses = () => {
  const { state, dispatch } = useDataContext();
  const currentSemester = useSearchParams().get("semester");
  const router = useRouter();

  const semExists = useMemo(() => {
    return state.semesterInfo.find(
      (semester) => semester.semester === currentSemester
    );
  }, [state.semesterInfo, currentSemester]);

  if (!semExists || !state.todayCourses.concat(state.notToday).length)
    return null;

  const handleResetAll = async () => {
    if (!currentSemester) {
      toast(`Semester is not selected`);
      return;
    }
    await resetAllCard(state.user, semExists);
    const TodayUpdatedCourse = state.todayCourses.map((course: inputData) => {
      return {
        ...course,
        present: 0,
        absent: 0,
        cancelled: 0,
        Totaldays: 35,
        criteria: 75,
      };
    });
    const notTodayUpdatedCourse = state.notToday.map((course: inputData) => {
      return {
        ...course,
        present: 0,
        absent: 0,
        cancelled: 0,
        Totaldays: 35,
        criteria: 75,
      };
    });
    dispatch({
      type: "SET_TODAY_COURSES",
      payload: TodayUpdatedCourse,
    });
    dispatch({
      type: "SET_NOT_TODAY",
      payload: notTodayUpdatedCourse,
    });
    toast(`All courses are updated`);
  };

  const handleDeleteAll = async () => {
    if (!currentSemester) {
      toast(`Semester is not selected`);
      return;
    }
    await deleteAllCard(state.user, semExists);
    dispatch({
      type: "SET_TODAY_COURSES",
      payload: [],
    });
    dispatch({
      type: "SET_NOT_TODAY",
      payload: [],
    });
    dispatch({
      type: "SET_ZERO_COURSES",
      payload: true,
    });
    router.push("?semester=" + currentSemester , {
      scroll: false,
    });
    toast(`All courses are deleted :)`);
  };
  return (
    <div className="w-full flex items-center gap-2">
      <CustomButton
        value="present"
        onClick={handleResetAll}
        className="px-4 py-2 w-full bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-200"
        content="Reset All"
        disabled={state.isBackendProcessing}
      />
      <CustomButton
        value="present"
        onClick={handleDeleteAll}
        className="px-4 py-2 w-full bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
        content="Delete All"
        disabled={state.isBackendProcessing}
      />
    </div>
  );
};

export default MutateCourses;
