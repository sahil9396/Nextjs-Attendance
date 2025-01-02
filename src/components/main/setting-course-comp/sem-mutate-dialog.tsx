"use client";
import CustomDialog from "@/components/global/custom-dialog";
import { Input } from "@/components/ui/input";
import { SingleSemester } from "@/lib/type";
import React, { useState } from "react";

type Props = {
  title: string;
  buttonContent: string;
  placeholder: string;
  handleSubmit: (semesterNumber: number) => void;
  semList: SingleSemester[];
  isBackendProcessing: boolean;
  processingText: string;
};

const SemMutateDialog = ({
  title,
  buttonContent,
  placeholder,
  semList,
  handleSubmit,
  isBackendProcessing,
  processingText,
}: Props) => {
  const [semesterNumber, setSemesterNumber] = useState<number>(NaN);

  return (
    <CustomDialog
      title={title}
      buttonContent={buttonContent}
      onSubmit={() => handleSubmit(semesterNumber)}
      isProcessing={isBackendProcessing}
      processingText={processingText}
    >
      <div className="flex flex-col w-full h-full space-y-4">
        <ul className="list-inside flex flex-wrap gap-2">
          {semList.length !== 0 ? (
            semList.map((sem, index) => (
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
          placeholder={placeholder}
          className="mt-4 p-2 border rounded"
        />
      </div>
    </CustomDialog>
  );
};

export default SemMutateDialog;
