"use client";
import { useDataContext } from "@/providers/data-provider";
import React from "react";
import { toast } from "sonner";
import { deleteSemester } from "../../../../lib/actions/sem-action";
import { useSearchParams } from "next/navigation";
import SemMutateDialog from "@/components/main/setting-course-comp/sem-mutate-dialog";

const DeleteSemester = () => {
  const { state, dispatch } = useDataContext();
  const searchParams = useSearchParams();
  const currentSemester = searchParams.get("semester");

  const semList = state.semesterInfo;

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
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: true });
    try {
      const response = await deleteSemester(
        state.user,
        `semester-${semesterNumber}`
      );
      if (!response) {
        toast.error("Error Deleting Semester");
        return;
      }
      dispatch({
        type: "SET_SEMESTER_INFO",
        payload: updatedSemesters,
      });
      toast.success("Semester Deleted Successfully");
    } catch (e) {
      toast.error(`error: ${e}`);
    }
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: false });
    if (currentSemester === `semester-${semesterNumber}`) {
      window.location.href = `/setting-page?semester=${updatedSemesters[0].semester}`;
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
      isBackendProcessing={state.isBackendProcessing}
    />
  );
};

export default DeleteSemester;
