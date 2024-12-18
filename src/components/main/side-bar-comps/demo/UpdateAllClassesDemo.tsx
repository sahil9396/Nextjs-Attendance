"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import CustomButton from "@/components/global/custom-button";
import { useDemoDataContext } from "@/providers/demo-data-provider";

const UpdateAllClassesDemo = () => {
  const pathName = usePathname().split("/").pop();
  const { state, dispatch } = useDemoDataContext();
  const currentSem = useSearchParams().get("semester");

  if (pathName !== "today" || state.demoTodayCourses.length === 0) return null;

  const handleUpdateStatus = async (status: string) => {
    const semExist = state.demoSemesterInfo.find(
      (sem) => sem.semester === currentSem
    );
    toast.message("Updating status...");
    if (!semExist || !state.demoUser) return;
    try {
      dispatch({
        type: "SET_DEMO_TODAY_COURSES",
        payload: state.demoTodayCourses.map((course) => ({
          ...course,
          [status]: (course[status] as number) + 1,
        })),
      });
      toast.success("Status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while updating status");
    }
  };

  const buttonList = [
    {
      value: "present",
      className: "lg:hover:bg-green-600",
      content: "All present",
    },
    {
      value: "absent",
      className: "lg:hover:bg-red-600",
      content: "All absent",
    },
    {
      value: "cancelled",
      className: "lg:hover:bg-yellow-600",
      content: "All cancelled",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      {buttonList.map((button) => (
        <CustomButton
          key={button.value}
          value={button.value}
          variant={"outline"}
          className={`${button.className} w-full border border-gray-500`}
          content={button.content}
          onClick={() => handleUpdateStatus(button.value)}
          disabled={
            state.demoIsBackendProcessing ||
            state.demoTodayCourses.length ===
              state.demoTodayStatusDone.courseNames.length
          }
        />
      ))}
    </div>
  );
};

export default UpdateAllClassesDemo;
