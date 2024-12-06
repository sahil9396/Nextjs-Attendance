import CustomButton from "@/components/global/custom-button";
import { inputData } from "@/lib/type";
import React from "react";
import { toast } from "sonner";

type Props = {
  currentSemester: string | null;
  isBackendProcessing: boolean;
  functionhandleResetAll: () => void;
  functionhandleDeleteAll: () => void;
  todayCourses: inputData[];
  notToday: inputData[];
};

const CourseMutateButtons = ({
  currentSemester,
  isBackendProcessing,
  functionhandleResetAll,
  functionhandleDeleteAll,
  todayCourses,
  notToday,
}: Props) => {
  if (!currentSemester || !(todayCourses.length + notToday.length)) return null;

  const handleResetAll = async () => {
    if (!currentSemester) {
      toast(`Semester is not selected`);
      return;
    }
    toast(`Working on it`);
    try {
      await functionhandleResetAll();
      toast.success(`All courses are updated`);
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  const handleDeleteAll = async () => {
    if (!currentSemester) {
      toast(`Semester is not selected`);
      return;
    }
    toast(`Working on it`);
    try {
      await functionhandleDeleteAll();
      toast.success(`All courses are deleted :)`);
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };
  const buttons = [
    {
      onClick: handleResetAll,
      content: "Reset All",
      hoverColor: "lg:hover:bg-green-600 dark:lg:hover:bg-green-600",
    },
    {
      onClick: handleDeleteAll,
      content: "Delete All",
      hoverColor: "lg:hover:bg-red-600 dark:lg:hover:bg-red-600",
    },
  ];

  return (
    <div className="w-full flex items-center gap-2">
      {buttons.map((button, index) => (
        <CustomButton
          key={index}
          value="present"
          onClick={button.onClick}
          className={`px-4 py-2 w-full bg-black dark:bg-white dark:text-black text-white rounded-lg ${button.hoverColor} dark:lg:hover:text-white transition-all duration-200`}
          content={button.content}
          disabled={isBackendProcessing}
        />
      ))}
    </div>
  );
};

export default CourseMutateButtons;
