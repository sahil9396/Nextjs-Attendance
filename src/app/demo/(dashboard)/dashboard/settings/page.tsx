"use client";

import { useDemoDataContext } from "@/providers/demo-data-provider";
import { inputData } from "@/lib/type";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import SettingsComp from "@/newComponents/settings";

export default function SettingsPage() {
  const { state, dispatch } = useDemoDataContext();
  const semList = state.demoSemesterInfo;
  const currentSemester = useSearchParams().get("semester");
  const router = useRouter();

  const handleResetAll = async () => {
    const TodayUpdatedCourse = state.demoTodayCourses.map(
      (course: inputData) => {
        return {
          ...course,
          present: 0,
          absent: 0,
          cancelled: 0,
          Totaldays: 35,
          criteria: 75,
        };
      }
    );
    const demoNotTodayUpdatedCourse = state.demoNotToday.map(
      (course: inputData) => {
        return {
          ...course,
          present: 0,
          absent: 0,
          cancelled: 0,
          Totaldays: 35,
          criteria: 75,
        };
      }
    );

    dispatch({
      type: "SET_DEMO_TODAY_COURSES",
      payload: TodayUpdatedCourse,
    });
    dispatch({
      type: "SET_DEMO_NOT_TODAY",
      payload: demoNotTodayUpdatedCourse,
    });
  };

  const handleDeleteAll = async () => {
    dispatch({
      type: "SET_DEMO_TODAY_COURSES",
      payload: [],
    });
    dispatch({
      type: "SET_DEMO_NOT_TODAY",
      payload: [],
    });
    dispatch({
      type: "SET_DEMO_ZERO_COURSES",
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
    dispatch({ type: "SET_DEMO_IS_BACKEND_PROCESSING", payload: true });
    try {
      dispatch({
        type: "SET_DEMO_SEMESTER_INFO",
        payload: [
          ...semList,
          {
            id: 1,
            semester: `semester-${semesterNumber}`,
            userId: 1,
          },
        ],
      });
      toast.success("Semester Created Successfully");
    } catch (e) {
      toast.error(`error: ${e}`);
    }
    dispatch({ type: "SET_DEMO_IS_BACKEND_PROCESSING", payload: false });
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
    dispatch({ type: "SET_DEMO_IS_BACKEND_PROCESSING", payload: true });
    try {
      dispatch({
        type: "SET_DEMO_SEMESTER_INFO",
        payload: updatedSemesters,
      });
      toast.success("Semester Deleted Successfully");
    } catch (e) {
      toast.error(`error: ${e}`);
    }
    dispatch({ type: "SET_DEMO_IS_BACKEND_PROCESSING", payload: false });
    if (currentSemester === `semester-${semesterNumber}`) {
      router.push(
        `/demo/dashboard/settings?semester=${updatedSemesters[0].semester}`
      );
      localStorage.setItem(
        "semester",
        JSON.stringify(updatedSemesters[0].semester)
      );
    }
  };

  return (
    <SettingsComp
      semList={semList}
      currentSemester={currentSemester}
      IsBackendProcessing={state.demoIsBackendProcessing}
      courseEmpty={
        state.demoTodayCourses.length + state.demoNotToday.length === 0
      }
      handleSubmitCreate={handleSubmitCreate}
      handleSubmitDelete={handleSubmitDelete}
      handleResetAll={handleResetAll}
      handleDeleteAll={handleDeleteAll}
      demo={true}
    />
  );
}
