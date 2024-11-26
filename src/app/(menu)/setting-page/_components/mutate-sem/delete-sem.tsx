"use client";
import CustomDialog from "@/components/global/custom-dialog";
import { Input } from "@/components/ui/input";
import { useDataContext } from "@/providers/data-provider";
import React, { useState } from "react";
import { toast } from "sonner";
import { deleteSemester } from "../../_actions/sem-action";
import { useSearchParams } from "next/navigation";

const DeleteSemester = () => {
  const [semesterNumber, setSemesterNumber] = useState<number>(NaN);
  const { state, dispatch } = useDataContext();
  const searchParams = useSearchParams();
  const currentSemester = searchParams.get("semester");

  const handleSubmit = async () => {
    if (state.semesterInfo.length === 1) {
      toast.error("At least one semester must exist");
      return;
    }
    if (!semesterNumber) {
      toast.error("Semester is required");
      return;
    }

    const updatedSemesters = state.semesterInfo.filter(
      (sem) => sem.semester !== `semester-${semesterNumber}`
    );

    if (updatedSemesters.length === state.semesterInfo.length) {
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
      console.log(response);
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
    <CustomDialog
      title="Delete Semester"
      description="Delete Semester"
      onSubmit={handleSubmit}
      isProcessing={state.isBackendProcessing}
      processingText="Deleting"
    >
      <div className="flex flex-col w-full h-full space-y-4">
        <ul className="list-inside flex flex-wrap gap-2">
          {state.semesterInfo.map((sem, index) => (
            <li
              className="bg-gray-500 p-2 rounded-md text-md text-white"
              key={index}
            >
              {sem.semester}
            </li>
          ))}
        </ul>
        <Input
          type="number"
          onChange={(e) => setSemesterNumber(parseInt(e.target.value))}
          placeholder="Enter Semester Number"
          className="mt-4 p-2 border rounded"
        />
      </div>
    </CustomDialog>
  );
};

export default DeleteSemester;
