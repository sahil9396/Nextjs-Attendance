"use client";

import { Dispatch, useState } from "react";
import { toast } from "sonner";
import { ActionType, SingleSemester } from "@/providers/data-provider";
import CustomSelectOption from "@/components/global/custom-select-option";
import { inputData, userDetailstype } from "@/lib/type";
import CustomButton from "@/components/global/custom-button";
import { updateStatus } from "../_actions/getTodaysList";

export function SubmitComp({
  course,
  user,
  semExist,
  todayCourses,
  dispatch,
  isBackendProcessing,
}: {
  course: inputData;
  user: userDetailstype;
  semExist: SingleSemester;
  todayCourses: inputData[];
  dispatch: Dispatch<ActionType>;
  isBackendProcessing: boolean;
}) {
  const [courseStatus, setCourseStatus] = useState<string>("Status!!!");

  const options = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const handleSubmit = async () => {
    if (courseStatus === "Status!!!") return toast("Select a status");
    toast.message("Updating status...");
    await updateStatus(user, course, courseStatus, semExist);
    dispatch({
      type: "SET_TODAY_COURSES",
      payload: todayCourses.map((c: inputData) =>
        c.IndivCourse !== course.IndivCourse
          ? c
          : {
              ...c,
              [courseStatus]: (c[courseStatus] as number) + 1,
            }
      ),
    });
    toast.success(`Status updated successfully for ${courseStatus}`);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <CustomSelectOption
        defaultValue="Status!!!"
        selectValue={courseStatus}
        options={options}
        showButton={false}
        isBackendProcessing={isBackendProcessing}
        setSelectValue={(value: string) => setCourseStatus(value)}
      />
      <CustomButton
        onClick={handleSubmit}
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
