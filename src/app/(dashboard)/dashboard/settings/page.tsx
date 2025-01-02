"use client";
import { inputData } from "@/lib/type";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import SettingsComp from "@/newComponents/settings";
import { useDataContext } from "@/providers/data-provider";
import { createSemester, deleteSemester } from "@/lib/actions/sem-action";
import {
  deleteAllCard,
  resetAllCard,
} from "@/lib/actions/mutate-course-action";
import { useMemo } from "react";
import { LoadingSpinner } from "@/components/global/load-spinner";

export const runtime = "edge";

export default function SettingsPage() {
  const { state, dispatch } = useDataContext();
  const semList = state.semesterInfo;
  const searchParam = useSearchParams();
  const currentSemester = searchParam.get("semester");

  const semExists = useMemo(() => {
    return state.semesterInfo.find(
      (semester) => semester.semester === currentSemester
    );
  }, [state.semesterInfo, currentSemester]);

  if (state.isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  const handleResetAll = async () => {
    if (!semExists || !(state.todayCourses.length + state.notToday.length))
      return null;
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
  };

  const handleDeleteAll = async () => {
    if (!semExists || !(state.todayCourses.length + state.notToday.length))
      return null;
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

  const handleSubmitCreate = async (semesterNumber: number) => {
    if (!semesterNumber || isNaN(semesterNumber) || semesterNumber < 1) {
      toast.error("Enter a valid Semester Number");
      return;
    }

    if (semList.some((sem) => sem.semester === `semester-${semesterNumber}`)) {
      toast.error("Semester Already Exists");
      return;
    }

    toast.message("Creating New Semester");
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: true });
    try {
      const response = await createSemester(state.user, semesterNumber);
      if (response === "Semester Already exists!!!") {
        toast.message("Semester Already exists!!!");
        return;
      }
      dispatch({
        type: "SET_SEMESTER_INFO",
        payload: [...semList, response],
      });
      toast.success("Semester Created Successfully");
    } catch (e) {
      toast.error(`${e}`);
    }
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: false });
  };

  const handleSubmitDelete = async (semesterNumber: number) => {
    if (semList.length === 1) {
      toast.error("At least one semester must exist");
      return;
    }
    if (!semesterNumber) {
      toast.error("Semester is required");
      return;
    }

    const updatedSemesters = semList.filter(
      (sem) => sem.semester !== `semester-${semesterNumber}`
    );

    if (updatedSemesters.length === semList.length) {
      toast.error("Semester Not Found");
      return;
    }

    toast.message(`Deleting Semester ${semesterNumber}`);
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: true });
    try {
      await deleteSemester(
        state.user,
        `semester-${semesterNumber}`
      );
      dispatch({
        type: "SET_SEMESTER_INFO",
        payload: updatedSemesters,
      });
      toast.success("Semester Deleted Successfully");
      if (currentSemester === `semester-${semesterNumber}`) {
        window.location.href = `/dashboard/settings?semester=${updatedSemesters[0].semester}`;
        localStorage.setItem(
          "semester",
          JSON.stringify(updatedSemesters[0].semester)
        );
      }
    } catch (e) {
      toast.error(`${e}`);
    }
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: false });
  };

  return (
    <SettingsComp
      semList={semList}
      currentSemester={currentSemester}
      IsBackendProcessing={state.isBackendProcessing}
      courseEmpty={state.todayCourses.length + state.notToday.length === 0}
      handleSubmitCreate={handleSubmitCreate}
      handleSubmitDelete={handleSubmitDelete}
      handleResetAll={handleResetAll}
      handleDeleteAll={handleDeleteAll}
    />
  );
}
