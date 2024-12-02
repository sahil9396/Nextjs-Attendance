"use client";
import CustomDialog from "@/components/global/custom-dialog";
import { Input } from "@/components/ui/input";
import { useDataContext } from "@/providers/data-provider";
import React, { useState } from "react";
import { toast } from "sonner";
import { createSemester } from "../../_actions/sem-action";
import { useRouter } from "next/navigation";

const CreateSemester = () => {
  const [semesterNumber, setSemesterNumber] = useState<number>(NaN);
  const { state, dispatch } = useDataContext();
  const router = useRouter();

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
    <CustomDialog
      title="New Semester"
      description="Create new semester"
      onSubmit={handleSubmit}
      isProcessing={state.isBackendProcessing}
    >
      <div className="flex flex-col w-full h-full space-y-4">
        <ul className="list-inside flex flex-wrap gap-2">
          {state.semesterInfo.length !== 0 ? (
            state.semesterInfo.map((sem, index) => (
              <li
                className="bg-gray-500 p-2 rounded-md text-md text-white"
                key={index}
              >
                {sem.semester}
              </li>
            ))
          ) : (
            <li className="bg-gray-500 p-2 rounded-md text-md text-white">
              No Semester Available
            </li>
          )}
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

export default CreateSemester;
