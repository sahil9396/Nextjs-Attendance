"use client";
import { useState } from "react";
import CustomSelectOption from "@/components/global/custom-select-option";
import CustomButton from "@/components/global/custom-button";

export function SubmitComp({
  isBackendProcessing,
  handleSubmit,
}: {
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
        variant={"default"}
        disabled={isBackendProcessing}
        content="Submit"
      />
    </div>
  );
}

export default SubmitComp;
