"use client";
import { useDataContext } from "@/providers/data-provider";
import React from "react";
import { toast } from "sonner";
import { createSemester } from "../../_actions/sem-action";
import { useRouter } from "next/navigation";
import SemMutateDialog from "@/components/main/setting-course-comp/sem-mutate-dialog";

const CreateSemester = () => {
  const { state, dispatch } = useDataContext();
  const router = useRouter();

  const handleSubmit = async (semesterNumber: number) => {
    if (!semesterNumber || isNaN(semesterNumber) || semesterNumber < 1) {
      toast.error("Enter a valid Semester Number");
      return;
    }

    if (
      state.semesterInfo.some(
        (sem) => sem.semester === `semester-${semesterNumber}`
      )
    ) {
      toast.error("Semester Already Exists");
      return;
    }

    toast.message("Creating New Semester");
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: true });
    try {
      const response = await createSemester(state.user, semesterNumber);
      if (!response) {
        toast.error("Error Creating Semester");
        return;
      }
      if (response === "Semester Already exists!!!") {
        toast.message("Semester Already exists!!!");
        return;
      }
      if (state.semesterInfo.length === 0) {
        router.push(`?semester=${response.semester}`, { scroll: false });
      }
      dispatch({
        type: "SET_SEMESTER_INFO",
        payload: [...state.semesterInfo, response],
      });
      toast.success("Semester Created Successfully");
    } catch (e) {
      toast.error(`error: ${e}`);
    }
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: false });
  };

  return (
    <SemMutateDialog
      title="Create Semester"
      buttonContent="Create Semester"
      placeholder="Enter Semester Number"
      semList={state.semesterInfo}
      handleSubmit={handleSubmit}
      isBackendProcessing={state.isBackendProcessing}
    />
  );
};

export default CreateSemester;
