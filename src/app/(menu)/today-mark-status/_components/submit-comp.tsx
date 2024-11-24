"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDataContext } from "@/providers/data-provider";
import CustomSelectOption from "@/components/global/custom-select-option";
import { inputData } from "@/lib/type";
import CustomButton from "@/components/global/custom-button";

export function SubmitComp({
  course,
}: // isBackendProcessing,
{
  course: inputData;
  // isBackendProcessing: boolean;
}) {
  const [courseStatus, setCourseStatus] = useState<string>("Status!!!");
  const { state, dispatch } = useDataContext();

  const options = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "cancelled", label: "Cancelled" },
  ];
  // const handleSubmit = async () => {
  //   if (!courseStatus) {
  //     return toast("Select a status");
  //   } else if (!currentSemester) {
  //     return toast("Select a semester");
  //   }
  //   try {
  //     const responseCourseName = await updateStatus(
  //       user,
  //       course,
  //       courseStatus,
  //       currentSemester
  //     );

  //     const updatedCourses = todayCourses.map((course: inputData) =>
  //       course.IndivCourse === responseCourseName
  //         ? {
  //             ...course,
  //             [courseStatus]:
  //               courseStatus === "present"
  //                 ? course.present + 1
  //                 : courseStatus === "absent"
  //                 ? course.absent + 1
  //                 : course.cancelled + 1,
  //           }
  //         : course
  //     );

  //     setTodayCourses(updatedCourses);

  //     toast(`Status updated successfully for ${responseCourseName}`);

  //     setTodayStatusDone({
  //       date: todayStatusDone.date || new Date().toDateString(),
  //       courseNames: [...todayStatusDone.courseNames, course.IndivCourse],
  //     });
  //   } catch (error) {
  //     toast(`Error updating status: ${error}`);
  //   }
  // };

  const handleSubmit = async () => {
    if (courseStatus === "Status!!!") return toast("Select a status");
    toast.message("Updating status...");
    dispatch({
      type: "SET_TODAY_COURSES",
      payload: state.todayCourses.map((c: inputData) =>
        c.IndivCourse !== course.IndivCourse
          ? c
          : {
              ...c,
              [courseStatus]:
                courseStatus === "present"
                  ? c.present + 1
                  : courseStatus === "absent"
                  ? c.absent + 1
                  : c.cancelled + 1,
            }
      ),
    });
    toast.success(`Status updated successfully for ${"responseCourseName"}`);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <CustomSelectOption
        defaultValue="Status!!!"
        selectValue={courseStatus}
        options={options}
        showButton={false}
        setSelectValue={(value: string) => setCourseStatus(value)}
      />
      <CustomButton
        onClick={handleSubmit}
        size={"sm"}
        className="bg-slate-600 dark:bg-gray-900 text-white"
        disabled={
          // isBackendProcessing ||
          state.todayStatusDone.courseNames.includes(course.IndivCourse)
        }
        content="Submit"
      />
    </div>
  );
}

export default SubmitComp;
