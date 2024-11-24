"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useDataContext } from "@/providers/data-provider";
import React, { useReducer, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import CustomButton from "@/components/global/custom-button";
import { inputData } from "@/lib/type";
import CustomSelectOption from "@/components/global/custom-select-option";

const ExtraClass = () => {
  const currentSemester = useSearchParams().get("semester");
  const pathName = usePathname().split("/").pop();
  const { state, dispatch } = useDataContext();
  const [courseName, seteCourseName] = useState<string>("");

  if (
    pathName !== "today-mark-status" ||
    state.todayCourses.concat(state.notToday).length === 0
  )
    return null;

  const options = state.todayCourses.concat(state.notToday).map((item) => ({
    value: item.IndivCourse,
    label: item.IndivCourse,
  })) || [{ value: "No Course", label: "No Course" }];

  const handleSubmit = async (
    e: React.MouseEvent<HTMLElement> | null | undefined
  ) => {
    if (!e) return;

    const status_Value = e.target as HTMLButtonElement;

    const allcourses = state.todayCourses.concat(state.notToday);
    const thatCourse: inputData | undefined = allcourses.find(
      (course: inputData) => course.IndivCourse === courseName
    );

    if (!thatCourse) return;

    // WIP : Need to check if the currentSemester is not null
    if (!currentSemester) return;
    toast(`Updating ${status_Value.value} status`);
    // const rec = await updateStatus(
    //   user,
    //   thatCourse,
    //   status_Value.value,
    //   currentSemester,
    //   true
    // );
    const updatedCourse: inputData = {
      ...thatCourse,
      [status_Value.value]:
        status_Value.value === "present"
          ? thatCourse.present + 1
          : status_Value.value === "absent"
          ? thatCourse.absent + 1
          : thatCourse.cancelled + 1,
    };
    if (
      state.todayCourses.find((course) => course.IndivCourse === courseName)
    ) {
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
    console.log("updatedCourse", state.todayCourses, thatCourse);
    return toast(`${currentSemester} status updated`);
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

type SelectScrollableProps = {
  filterData: inputData[];
  value: string;
  setValue: (e: string) => void;
};

function SelectScrollable({
  filterData,
  value,
  setValue,
}: SelectScrollableProps) {
  return (
    <Select defaultValue={value} onValueChange={(e: string) => setValue(e)}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select a course" />
      </SelectTrigger>
      <SelectContent>
        {filterData.map((course, index) => (
          <SelectItem key={index} value={course.IndivCourse}>
            {course.IndivCourse}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
