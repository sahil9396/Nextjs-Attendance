"use client";
import { usePathname, useSearchParams } from "next/navigation";
import ExtraClassGlobal from "@/components/global/extra-class-global";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import React, { useState } from "react";
import { helperForCourseSelectDemo } from "@/lib/constants";
import { toast } from "sonner";
import { inputData } from "@/lib/type";

const ExtraClassDemo = () => {
  const { state, dispatch } = useDemoDataContext();
  const searchParam = useSearchParams();
  const pathName = usePathname().split("/").pop();
  const [courseName, seteCourseName] = useState<string>("");
  const currentSemester = searchParam.get("semester");

  if (
    pathName !== "today" ||
    state.demoTodayCourses.concat(state.demoNotToday).length === 0
  )
    return null;

  const { thatCourse, fromList } = helperForCourseSelectDemo(state, courseName);

  const options = state.demoTodayCourses
    .concat(state.demoNotToday)
    .map((item) => ({
      value: item.IndivCourse,
      label: item.IndivCourse,
    })) || [{ value: "No Course", label: "No Course" }];

  const handleSubmit = async (
    e: React.MouseEvent<HTMLElement> | null | undefined
  ) => {
    const semExist = state.demoSemesterInfo.find(
      (sem) => sem.semester === currentSemester
    );
    if (!e || !semExist || !thatCourse || !currentSemester) return;

    const status_Value = e.target as HTMLButtonElement;

    toast(`Updating ${status_Value.value} status`);
    try {
      const updatedCourse: inputData = {
        ...thatCourse,
        [status_Value.value]:
          status_Value.value === "present"
            ? thatCourse.present + 1
            : status_Value.value === "absent"
            ? thatCourse.absent + 1
            : thatCourse.cancelled + 1,
      };

      if (fromList === "todayCourses") {
        dispatch({
          type: "SET_DEMO_TODAY_COURSES",
          payload: state.demoTodayCourses.map((course) =>
            course.IndivCourse === courseName ? updatedCourse : course
          ),
        });
      } else {
        dispatch({
          type: "SET_DEMO_NOT_TODAY",
          payload: state.demoNotToday.map((course) =>
            course.IndivCourse === courseName ? updatedCourse : course
          ),
        });
      }
      return toast(`${currentSemester} status updated`);
    } catch (error) {
      console.error(error);
      return toast.error("Error occurred while updating status");
    }
  };

  return (
    <ExtraClassGlobal
      selectValue={courseName}
      setSelectValue={(value) => seteCourseName(value)}
      options={options}
      isBackendProcessing={state.demoIsBackendProcessing}
      showButton={false}
      dialogTitle="Are you absolutely sure?"
      dialogDescription="Select Course"
      buttonActions={[
        {
          value: "present",
          content: "present",
          onClick: handleSubmit,
        },
        {
          value: "absent",
          content: "absent",
          onClick: handleSubmit,
        },
      ]}
    />
  );
};

export default ExtraClassDemo;
