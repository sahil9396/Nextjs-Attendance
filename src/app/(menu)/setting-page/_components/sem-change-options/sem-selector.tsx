"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useDataContext } from "@/providers/data-provider";
import CustomSelector from "@/components/main/setting-course-comp/custom-selector";

const SemSelector = () => {
  const currentSemester = useSearchParams().get("semester");
  const { isLoading, semesterInfo } = useDataContext().state;

  if (isLoading) return null;

  return (
    <CustomSelector
      currentSemester={currentSemester || semesterInfo[0].semester}
      semesterList={semesterInfo}
    />
  );
};

export default SemSelector;
