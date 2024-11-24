"use client";
import CustomDialog from "@/components/global/custom-dialog";
import { Input } from "@/components/ui/input";
import { SingleSemester } from "@/providers/data-provider";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  semList: SingleSemester[];
};

const CreateSemester = ({ semList }: Props) => {
  const [semesterNumber, setSemesterNumber] = useState<number>(NaN);

  const handleSubmit = () => {
    if (isNaN(semesterNumber)) {
      toast.error("Semester Number is required");
      return;
    }

    if (semesterNumber <= 0) {
      toast.error("Semester Number should be greater than 0");
      return;
    }

    if (semList.some((sem) => sem.semester === `semester-${semesterNumber}`)) {
      toast.error("Semester already exists");
      return;
    }
  };

  return (
    <CustomDialog
      title="New Semester"
      description="Create New Semester"
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

export default CreateSemester;
