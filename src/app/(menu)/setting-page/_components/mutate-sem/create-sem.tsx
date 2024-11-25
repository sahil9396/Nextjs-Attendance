"use client";
import CustomDialog from "@/components/global/custom-dialog";
import { Input } from "@/components/ui/input";
import { useDataContext } from "@/providers/data-provider";
import React, { useState } from "react";
import { toast } from "sonner";
import { createSemester } from "../../_actions/sem-action";

const CreateSemester = () => {
  const [semesterNumber, setSemesterNumber] = useState<number>(NaN);
  const { state, dispatch } = useDataContext();

  const handleSubmit = async () => {
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
    <CustomDialog
      title="New Semester"
      description="Create New Semester"
      onSubmit={handleSubmit}
        isProcessing={state.isBackendProcessing}
    >
      <Input
        type="number"
        onChange={(e) => setSemesterNumber(parseInt(e.target.value))}
        placeholder="Semester Number"
      />
    </CustomDialog>
  );
};

export default CreateSemester;
