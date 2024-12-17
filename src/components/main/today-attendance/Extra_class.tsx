"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useDataContext } from "@/providers/data-provider";
import React, { useState } from "react";
import { toast } from "sonner";
import { inputData } from "@/lib/type";
import { helperForCourseSelect } from "@/lib/constants";
import { updateStatus } from "@/lib/actions/getTodaysList";
import ExtraClassGlobal from "@/components/global/extra-class-global";

const ExtraClass = () => {
  const { state, dispatch } = useDataContext();
  const searchParam = useSearchParams();
  const pathName = usePathname().split("/").pop();
  const [courseName, seteCourseName] = useState<string>("");
  const currentSemester = searchParam.get("semester");

  if (
    pathName !== "today" ||
    state.todayCourses.concat(state.notToday).length === 0
  )
    return null;

  const { thatCourse, fromList } = helperForCourseSelect(state, courseName);

  const options = state.todayCourses.concat(state.notToday).map((item) => ({
    value: item.IndivCourse,
    label: item.IndivCourse,
  })) || [{ value: "No Course", label: "No Course" }];

  const handleSubmit = async (
    e: React.MouseEvent<HTMLElement> | null | undefined
  ) => {
    const semExist = state.semesterInfo.find(
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
      const reponse = await updateStatus(
        state.user,
        thatCourse,
        status_Value.value,
        semExist,
        true
      );

      if (reponse === "Failed") {
        return toast.error("Failed to update status , sign out and try again");
      }

      if (fromList === "todayCourses") {
        dispatch({
          type: "SET_TODAY_COURSES",
          payload: state.todayCourses.map((course) =>
            course.IndivCourse === courseName ? updatedCourse : course
          ),
        });
      } else {
        dispatch({
          type: "SET_NOT_TODAY",
          payload: state.notToday.map((course) =>
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
      isBackendProcessing={state.isBackendProcessing}
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

export default ExtraClass;
