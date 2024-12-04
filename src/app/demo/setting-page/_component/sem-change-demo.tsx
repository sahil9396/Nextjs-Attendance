"use client";
import CourseMutateButtons from "@/components/main/setting-course-comp/course-mutate-buttons";
import CustomSelector from "@/components/main/setting-course-comp/custom-selector";
import SemMutateDialog from "@/components/main/setting-course-comp/sem-mutate-dialog";
import { inputData } from "@/lib/type";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const SemChangeDemo = () => {
  return (
    <div>
      <SemSelector />
      <div className="flex flex-col py-3 lg:flex-row gap-2 lg:gap-4 w-full">
        <CreateSemester />
        <DeleteSemester />
      </div>
      <MutateCourses />
    </div>
  );
};

export default SemChangeDemo;

const SemSelector = () => {
  const currentSemester = null;
  const { demoSemesterInfo: semList } = useDemoDataContext().state;

  return (
    <CustomSelector
      currentSemester={currentSemester || semList[0].semester}
      semesterList={semList}
    />
  );
};

const CreateSemester = () => {
  const { state, dispatch } = useDemoDataContext();
  const semList = state.demoSemesterInfo;

  const handleSubmit = async (semesterNumber: number) => {
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

  return (
    <SemMutateDialog
      title="Create Semester"
      buttonContent="Create Semester"
      placeholder="Enter Semester Number"
      semList={semList}
      handleSubmit={handleSubmit}
      isBackendProcessing={state.demoIsBackendProcessing}
    />
  );
};

const DeleteSemester = () => {
  const { state, dispatch } = useDemoDataContext();
  const router = useRouter();
  const semList = state.demoSemesterInfo;
  const currentSemester = null;

  const handleSubmit = async (semesterNumber: number) => {
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
      router.push(`/setting-page?semester=${updatedSemesters[0].semester}`);
      localStorage.setItem(
        "semester",
        JSON.stringify(updatedSemesters[0].semester)
      );
    }
  };

  return (
    <SemMutateDialog
      title="Delete Semester"
      buttonContent="Delete Semester"
      placeholder="Enter Semester Number"
      semList={semList}
      handleSubmit={handleSubmit}
      isBackendProcessing={state.demoIsBackendProcessing}
    />
  );
};

const MutateCourses = () => {
  const { state, dispatch } = useDemoDataContext();
  const currentSemester = `semester-1`;

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

  return (
    <CourseMutateButtons
      currentSemester={currentSemester}
      isBackendProcessing={state.demoIsBackendProcessing}
      functionhandleResetAll={handleResetAll}
      functionhandleDeleteAll={handleDeleteAll}
      todayCourses={state.demoTodayCourses}
      notToday={state.demoNotToday}
    />
  );
};
