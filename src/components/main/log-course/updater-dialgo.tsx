"use client";
import { updateList } from "@/app/(menu)/list-course/_actions/log-courses-server-functions";
import { DaySelector } from "@/app/(menu)/setting-page/_components/create-course";
import CustomButton from "@/components/global/custom-button";
import CustomDialog from "@/components/global/custom-dialog";
import { CustromInput } from "@/components/global/custom-input";
import { day, inputData } from "@/lib/type";
import { useDataContext } from "@/providers/data-provider";
import React, { useEffect, useState, useCallback } from "react";
import { todayCourseDecider, weekDays as weekDaysList } from "@/lib/constants";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const weekDaysWithBoolen: day = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
};

type courseDetailsType = {
  timeofcourse: string;
  Totaldays: number;
  present: number;
  absent: number;
  cancelled: number;
  criteria: number;
} & { [key: string]: string | number };

const initialCourseDetails: courseDetailsType = {
  timeofcourse: "",
  Totaldays: 0,
  present: 0,
  absent: 0,
  cancelled: 0,
  criteria: 0,
};

const objectGenerator = (list: inputData) => {
  if (!list) return null;
  return {
    timeofcourse: list.timeofcourse,
    Totaldays: list.Totaldays,
    present: list.present,
    absent: list.absent,
    cancelled: list.cancelled,
    criteria: list.criteria,
  };
};

const isDayListSame = (dayListOne: string[], dayListTwo: string[]) => {
  if (dayListOne.length !== dayListTwo.length) return false;
  return dayListOne.every((day) => dayListTwo.includes(day));
};

// WIP : Refractor this component
const UpdaterDialog = ({
  courseName,
  today,
}: {
  courseName: string;
  today: string | null;
}) => {
  const { state, dispatch } = useDataContext();
  const currentSem = useSearchParams().get("semester");
  const [thatCourse] = useState(() => {
    if (today === "true") {
      return state.todayCourses.find(
        (course: inputData) => course.IndivCourse === courseName
      );
    }
    return state.notToday.find(
      (course: inputData) => course.IndivCourse === courseName
    );
  });

  const [courseDetails, setCourseDetails] = useState<courseDetailsType | null>(
    initialCourseDetails
  );

  const [weekDays, setWeekDays] = useState<day>(weekDaysWithBoolen);

  useEffect(() => {
    if (!thatCourse) return;

    setCourseDetails(objectGenerator(thatCourse));
    setWeekDays({
      ...weekDaysWithBoolen,
      ...Object.fromEntries(
        thatCourse?.thatday.map((day) => [day, true]) || []
      ),
    });
  }, [courseName, setCourseDetails, setWeekDays, thatCourse]);

  const handleSubmit = useCallback(async () => {
    const semExists = state.semesterInfo.find(
      (sem) => sem.semester === currentSem
    );
    if (!semExists || !thatCourse || !currentSem) return null;

    toast.message(
      "Course is being updated, please wait for the process to complete"
    );

    const daySelected = Object.keys(weekDays).filter(
      (day) => weekDays[day as keyof typeof weekDays]
    );

    const updatedCourse: inputData = {
      ...thatCourse,
      ...courseDetails,
      thatday: daySelected,
    };

    // console.log(
    await updateList(
      semExists,
      state.user,
      updatedCourse,
      isDayListSame(daySelected, thatCourse.thatday)
    );

    const eligibleForToday = daySelected.includes(
      weekDaysList[todayCourseDecider]
    );

    const alreadyExistsInToday = state.todayCourses.find(
      (course) => course.IndivCourse === courseName
    );

    if (alreadyExistsInToday) {
      if (eligibleForToday) {
        const updatedList = state.todayCourses.map((course) =>
          course.IndivCourse === courseName ? updatedCourse : course
        );
        dispatch({
          type: "SET_TODAY_COURSES",
          payload: updatedList,
        });
      } else {
        const updatedTodayList = state.todayCourses.filter(
          (course) => course.IndivCourse !== courseName
        );
        dispatch({
          type: "SET_TODAY_COURSES",
          payload: updatedTodayList,
        });
        dispatch({
          type: "SET_NOT_TODAY",
          payload: [...state.notToday, updatedCourse],
        });
      }
    } else {
      if (eligibleForToday) {
        dispatch({
          type: "SET_TODAY_COURSES",
          payload: [...state.todayCourses, updatedCourse],
        });
        const updatedNotTodayList = state.notToday.filter(
          (course) => course.IndivCourse !== courseName
        );
        dispatch({
          type: "SET_NOT_TODAY",
          payload: updatedNotTodayList,
        });
      } else {
        const updatedList = state.notToday.map((course) =>
          course.IndivCourse === courseName ? updatedCourse : course
        );
        dispatch({
          type: "SET_NOT_TODAY",
          payload: updatedList,
        });
      }
    }

    toast.success("Course updated successfully!");
  }, []);

  return (
    <CustomDialog
      title="Update Course"
      description="Update Course"
      onSubmit={handleSubmit}
      isProcessing={false}
      processingText="Updating"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium leading-none">
              Attendance{" "}
              <strong className={`dark:text-white text-black`}>
                {" "}
                {courseName}
              </strong>
            </h4>
            <CustomButton
              size={"sm"}
              className="bg-slate-600 dark:bg-gray-900 text-white"
              content="Reset"
              onClick={() => {
                setWeekDays({
                  ...weekDaysWithBoolen,
                  ...Object.fromEntries(
                    thatCourse?.thatday.map((day) => [day, true]) || []
                  ),
                });
                if (thatCourse) setCourseDetails(objectGenerator(thatCourse));
              }}
            />
          </div>
        </div>
        <div className="space-y-4 overflow-y-auto">
          {!!courseDetails &&
            Object.keys(courseDetails).map((key) => (
              <CustromInput
                key={key}
                label={key}
                value={courseDetails[key as keyof typeof courseDetails]}
                onChange={(value) => {
                  setCourseDetails({ ...courseDetails, [key]: Number(value) });
                }}
                type="text"
              />
            ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.keys(weekDays).map((day: string) => (
            <DaySelector
              key={day}
              day={day}
              isSelected={weekDays[day as keyof typeof weekDays] as boolean}
              toggleDay={() =>
                setWeekDays((prevWeekDays) => ({
                  ...prevWeekDays,
                  [day]: !prevWeekDays[day as keyof typeof weekDays],
                }))
              }
            />
          ))}
        </div>
      </div>
    </CustomDialog>
  );
};

export default UpdaterDialog;
