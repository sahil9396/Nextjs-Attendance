"use client";

import { Dispatch, useState } from "react";
import { ActionType } from "@/providers/data-provider";
import CustomSelectOption from "@/components/global/custom-select-option";
import { inputData, SingleSemester, userDetailstype } from "@/lib/type";
import CustomButton from "@/components/global/custom-button";
import { demoActionType } from "@/providers/demo-data-provider";

export function SubmitComp({
  isBackendProcessing,
  handleSubmit,
}: {
  course: inputData;
  user: userDetailstype;
  semExist: SingleSemester;
  todayCourses: inputData[];
  dispatch: Dispatch<ActionType> | Dispatch<demoActionType>;
  isBackendProcessing: boolean;
  handleSubmit: (courseStatus: string) => void;
}) {
  const [courseStatus, setCourseStatus] = useState<string>("Status!!!");

  const options = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="w-full flex flex-col gap-2">
      <CustomSelectOption
        defaultValue="Status!!!"
        options={options}
        showButton={false}
        isBackendProcessing={isBackendProcessing}
        setSelectValue={(value: string) => setCourseStatus(value)}
      />
      <CustomButton
        onClick={() => handleSubmit(courseStatus)}
        size={"sm"}
        className="bg-slate-600 dark:bg-gray-900 text-white"
        disabled={
          isBackendProcessing
          //|| todayStatusDone.courseNames.includes(course.IndivCourse)
        }
        content="Submit"
      />
    </div>
  );
}

export default SubmitComp;
