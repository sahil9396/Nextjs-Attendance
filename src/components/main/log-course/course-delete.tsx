"use client";
import CustomButton from "@/components/global/custom-button";
import { SingleSemester } from "@/lib/type";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  isBackendProcessing: boolean;
  semList: SingleSemester[];
  selected: string;
  today: string | null;
  currentSemester: string;
  funtionInbetween: (semExists: SingleSemester) => void;
};

const CourseDelete = ({
  isBackendProcessing,
  semList,
  selected,
  today,
  currentSemester: currentSem,
  funtionInbetween,
}: Props) => {
  const route = useRouter();
  const handleDelete = async () => {
    const semExists = semList.find(
      (sem: SingleSemester) => sem.semester === currentSem
    );
    if (!semExists || !selected) {
      toast.error("Semester not found");
      return;
    }
    toast.message(
      "Course is being updated, please wait for the process to complete"
    );

    try {
      await funtionInbetween(semExists);
      route.push(`?semester=${currentSem}`);
      toast.success(`Course deleted successfully ${selected} ${today}`);
    } catch (error) {
      toast.error("Error occurred while deleting course");
      console.error(error);
    }
  };

  return (
    <CustomButton
      size={"sm"}
      className="bg-red-600 hover:bg-red-700 w-full text-white dark:bg-red-500 dark:hover:bg-red-400"
      onClick={handleDelete}
      disabled={isBackendProcessing}
      content="Delete"
    />
  );
};

export default CourseDelete;
