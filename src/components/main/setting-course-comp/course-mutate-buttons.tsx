import CustomButton from "@/components/global/custom-button";
import React from "react";
import { toast } from "sonner";

type Props = {
  currentSemester: string | null;
  isBackendProcessing: boolean;
  functionhandleResetAll: () => void;
  functionhandleDeleteAll: () => void;
};

const CourseMutateButtons = ({
  currentSemester,
  isBackendProcessing,
  functionhandleResetAll,
  functionhandleDeleteAll,
}: Props) => {
  
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
          className={`px-4 py-2 w-full ${button.hoverColor} dark:lg:hover:text-white transition-all duration-200`}
          variant={button.content === "Reset All" ? "outline" : "destructive"}
          content={button.content}
          disabled={isBackendProcessing}
        />
      ))}
    </div>
  );
};

export default CourseMutateButtons;
