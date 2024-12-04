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

  return (
    <div className="w-full flex items-center gap-2">
      <CustomButton
        value="present"
        onClick={handleResetAll}
        className="px-4 py-2 w-full bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-200"
        content="Reset All"
        disabled={isBackendProcessing}
      />
      <CustomButton
        value="present"
        onClick={handleDeleteAll}
        className="px-4 py-2 w-full bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
        content="Delete All"
        disabled={isBackendProcessing}
      />
    </div>
  );
};

export default CourseMutateButtons;
