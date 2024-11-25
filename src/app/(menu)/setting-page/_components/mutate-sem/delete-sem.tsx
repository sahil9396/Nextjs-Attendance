"use client";
import CustomDialog from "@/components/global/custom-dialog";
import { Input } from "@/components/ui/input";
import { useDataContext } from "@/providers/data-provider";
import React, { useState } from "react";
import { toast } from "sonner";
import { deleteSemester } from "../../_actions/sem-action";

const DeleteSemester = () => {
  const [semesterNumber, setSemesterNumber] = useState<number>(NaN);
  const { state, dispatch } = useDataContext();

  const handleSubmit = async () => {
    if (state.semesterInfo.length === 1) {
      toast.error("At least one semester must exist");
      return;
    }
    if (!semesterNumber) {
      toast.error("Semester is required");
      return;
    }

    const target = state.semesterInfo.find(
      (sem) => sem.semester === `semester-${semesterNumber}`
    );
    if (!target) {
      toast.error("Semester Not Found");
      return;
    }

    toast.message(`Deleting Semester ${semesterNumber}`);
    try {
      const response = await deleteSemester(state.user, target);
      console.log(response);
      if (!response) {
        toast.error("Error Deleting Semester");
        return;
      }
      const updatedSemesters = state.semesterInfo.filter(
        (sem) => sem.semester !== `semester-${semesterNumber}`
      );
      if (updatedSemesters.length === 0) {
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
  };

  return (
    <CustomDialog
      title="Delete Semester"
      description="Delete Semester"
      onSubmit={handleSubmit}
      //   isProcessing={isBackendProcessing}
    >
      <Input
        type="number"
        onChange={(e) => setSemesterNumber(parseInt(e.target.value))}
        placeholder="Semester Number"
      />
    </CustomDialog>
  );
};

export default DeleteSemester;
