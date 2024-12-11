"use client";
import { inputData } from "@/lib/type";
import { useDataContext } from "@/providers/data-provider";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { toast } from "sonner";
import { deleteAllCard, resetAllCard } from "../_actions/mutate-course-action";
import CourseMutateButtons from "@/components/main/setting-course-comp/course-mutate-buttons";

const MutateCourses = () => {
  const { state, dispatch } = useDataContext();
  const currentSemester = useSearchParams().get("semester");

  const semExists = useMemo(() => {
    return state.semesterInfo.find(
      (semester) => semester.semester === currentSemester
    );
  }, [state.semesterInfo, currentSemester]);

  if (!semExists || !(state.todayCourses.length + state.notToday.length))
    return null;

  const handleResetAll = async () => {
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
  };
  return (
    <CourseMutateButtons
      currentSemester={currentSemester}
      isBackendProcessing={state.isBackendProcessing}
      functionhandleResetAll={handleResetAll}
      functionhandleDeleteAll={handleDeleteAll}
      todayCourses={state.todayCourses}
      notToday={state.notToday}
    />
  );
};

export default MutateCourses;
