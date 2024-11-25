"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useDataContext } from "@/providers/data-provider";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import CustomButton from "@/components/global/custom-button";
import { inputData } from "@/lib/type";
import CustomSelectOption from "@/components/global/custom-select-option";
import { helperForCourseSelect } from "@/lib/constants";
import { updateStatus } from "@/app/(menu)/today-mark-status/_actions/getTodaysList";

const ExtraClass = () => {
  const searchParam = useSearchParams();
  const pathName = usePathname().split("/").pop();
  const { state, dispatch } = useDataContext();
  const [courseName, seteCourseName] = useState<string>("");
  const currentSemester = searchParam.get("semester");

  if (
    pathName !== "today-mark-status" ||
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
      await updateStatus(
        state.user,
        thatCourse,
        status_Value.value,
        semExist,
        true
      );

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
    <div className="w-full bg-transparent flex flex-col ">
      <Dialog>
        <DialogTrigger
          className={`flex justify-center w-full bg-white py-2 px-4 rounded-lg md:hover:bg-slate-800 transition duration-300 text-black`}
        >
          Extra Class!!!
        </DialogTrigger>
        <DialogContent className=" p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-2">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription className="text-sm w-full text-gray-400 flex justify-center">
              <CustomSelectOption
                selectValue={courseName}
                // setSelectValue={(value) => {
                //   dispatch({ type: "courseName", payload: value });
                //   const courseDetail = contextState.todayCourses
                //     .concat(contextState.notToday)
                //     .find((sem: inputData) => sem.IndivCourse === value);
                //   dispatch({
                //     type: "courseDetails",
                //     payload: objectGenerator(courseDetail),
                //   });
                //   const thatDaysWithCourse = courseDetail?.thatday.reduce(
                //     (acc, day) => ({
                //       ...acc,
                //       [day]: true,
                //     }),
                //     {}
                //   );
                //   dispatch({
                //     type: "weekDays",
                //     payload: {
                //       ...weekDaysWithBoolen,
                //       ...thatDaysWithCourse,
                //     },
                //   });
                // }}
                setSelectValue={(value) => seteCourseName(value)}
                options={options}
                showButton={false}
              />
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex justify-center gap-4">
            <CustomButton
              value="present"
              variant={"default"}
              content="Present"
              onClick={handleSubmit}
              // disabled={isBackendProcessing}
            />
            <CustomButton
              value="absent"
              content="Absent"
              onClick={(e) => handleSubmit(e)}
              //   disabled={isBackendProcessing}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExtraClass;
