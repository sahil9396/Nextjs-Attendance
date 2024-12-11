"use client";
import CustomButton from "@/components/global/custom-button";
import CustomDialog from "@/components/global/custom-dialog";
import { CustromInput } from "@/components/global/custom-input";
import { day, inputData } from "@/lib/type";
import React, { useState } from "react";
import { justWeekDays, todayCourseDecider, weekDays } from "@/lib/constants";
import { toast } from "sonner";
import { DaySelector } from "@/components/global/custom-form";

const weekDaysWithBoolen: day = weekDays;

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

const useCourseDetails = (thatCourse: inputData | undefined) => {
  const [courseDetails, setCourseDetails] = useState<courseDetailsType | null>(
    () => {
      if (!thatCourse) return initialCourseDetails;
      return objectGenerator(thatCourse);
    }
  );

  const [weekDays, setWeekDays] = useState<day>(() => {
    if (!thatCourse) return weekDaysWithBoolen;
    return {
      ...weekDaysWithBoolen,
      ...Object.fromEntries(
        thatCourse?.thatday.map((day) => [day, true]) || []
      ),
    };
  });

  const resetCourseDetails = () => {
    setWeekDays({
      ...weekDaysWithBoolen,
      ...Object.fromEntries(
        thatCourse?.thatday.map((day) => [day, true]) || []
      ),
    });
    if (thatCourse) setCourseDetails(objectGenerator(thatCourse));
  };

  return {
    courseDetails,
    setCourseDetails,
    weekDays,
    setWeekDays,
    resetCourseDetails,
  };
};

const UpdaterDialog = ({
  thatCourse,
  currentSemester,
  courseName,
  today,
  functionInbetween,
}: {
  thatCourse: inputData | undefined;
  currentSemester: string;
  courseName: string;
  today: string | null;
  functionInbetween: (
    updatedCourse: inputData,
    eligibleForToday: boolean,
    dayListSame: boolean
  ) => void;
}) => {
  const {
    courseDetails,
    setCourseDetails,
    weekDays,
    setWeekDays,
    resetCourseDetails,
  } = useCourseDetails(thatCourse);

  if (!thatCourse) return null;

  const handleSubmit = async () => {
    if (!currentSemester || !thatCourse || !courseName || !today) return null;

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

    const eligibleForToday = daySelected.includes(
      justWeekDays.at(todayCourseDecider) || ""
    );
    try {
      await functionInbetween(
        updatedCourse,
        eligibleForToday,
        isDayListSame(daySelected, thatCourse.thatday)
      );
      toast.success("Course updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update course");
    }
  };

  return (
    <CustomDialog
      title="Update Course"
      buttonContent="Update Course"
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
                {courseName}
              </strong>
            </h4>
            <CustomButton
              size={"sm"}
              className="bg-slate-600 dark:bg-gray-900 text-white"
              content="Reset"
              onClick={resetCourseDetails}
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
