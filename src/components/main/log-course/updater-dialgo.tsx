"use client";
import {
  getList,
  updateList,
} from "@/app/(menu)/list-course/_actions/log-courses-server-functions";
import { DaySelector } from "@/app/(menu)/setting-page/_components/create-course";
import CustomButton from "@/components/global/custom-button";
import CustomDialog from "@/components/global/custom-dialog";
import { CustromInput } from "@/components/global/custom-input";
import CustomSelectOption from "@/components/global/custom-select-option";
import { getSemesterList, getUserInfo } from "@/lib/all-server";
import { inputData } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { useSearchParams } from "next/navigation";
import { useDataContext } from "@/providers/data-provider";
import React, { useMemo, useReducer } from "react";
import { findCourseFromList } from "@/lib/constants";

interface actionType {
  type: string;
  payload: any;
}

type weekDaysType = {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
} & { [key: string]: boolean };

interface initialStateType {
  weekDays: weekDaysType;
  courseDetails: {
    timeofcourse: string;
    Totaldays: number;
    present: number;
    absent: number;
    cancelled: number;
    criteria: number;
  } & { [key: string]: string | number };
}

const weekDaysWithBoolen: weekDaysType = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
};

const initialState: initialStateType = {
  weekDays: weekDaysWithBoolen,
  courseDetails: {
    timeofcourse: "",
    Totaldays: 0,
    present: 0,
    absent: 0,
    cancelled: 0,
    criteria: 75,
  },
};

const objectGenerator = (list: any, givenValue?: any) => {
  return Object.entries(list)
    .slice(2, 8)
    .reduce((acc, [key, value]) => {
      return { ...acc, [key]: givenValue ? givenValue : value };
    }, {});
};

const reducerFn = (state: typeof initialState, action: actionType) => {
  switch (action.type) {
    case "courseName":
      return {
        ...state,
        courseName: action.payload,
      };
    case "weekDays":
      return {
        ...state,
        weekDays: action.payload,
      };
    case "courseDetails":
      const isNegative = Object.values(action.payload).find(
        (value) => (value as number) < 0
      );
      if (isNegative) return state;
      return {
        ...state,
        courseDetails: action.payload,
      };
    case "reset":
      return {
        weekDays: action.payload.weekDays,
        courseDetails: action.payload.courseDetails,
      };
    default:
      return state;
  }
};

const UpdaterDialog = ({ courseName }: { courseName: string }) => {
  const { state: contextState, dispatch: contextDisptach } = useDataContext();

  const thatCourse = useMemo(() => {
    return (
      findCourseFromList(contextState.todayCourses, courseName) ||
      findCourseFromList(contextState.notToday, courseName)
    );
  }, [contextState.todayCourses, contextState.notToday]);

  const [state, dispatch] = useReducer(reducerFn, {
    courseDetails: objectGenerator(thatCourse),
    weekDays: {
      ...weekDaysWithBoolen,
      ...Object.fromEntries(
        thatCourse?.thatday.map((day) => [day, true]) || []
      ),
    },
  });

  const handleSubmit = async () => {
    const updatedCourse: inputData = {
      ...state.courseDetails,
      thatday: Object.keys(state.weekDays).filter((day) => state.weekDays[day]),
    };
    console.log("updatedCourse", updatedCourse);
    // await updateList(updatedCourse);
    // revalidatePath("/path-to-revalidate");
  };

  return (
    <CustomDialog
      title="Update Semester"
      description="Update Semester"
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
                dispatch({
                  type: "reset",
                  payload: {
                    weekDays: {
                      ...weekDaysWithBoolen,
                      ...Object.fromEntries(
                        thatCourse?.thatday.map((day) => [day, true]) || []
                      ),
                    },
                    courseDetails: objectGenerator(thatCourse),
                  },
                });
              }}
            />
          </div>
        </div>
        <div className="space-y-4 overflow-y-auto">
          {Object.keys(state.courseDetails).map((key, id) => (
            <CustromInput
              key={id}
              label={key}
              value={
                state.courseDetails[key as keyof typeof state.courseDetails]
              }
              onChange={(value) => {
                dispatch({
                  type: "courseDetails",
                  payload: {
                    ...state.courseDetails,
                    [key]: Number(value),
                  },
                });
              }}
              type="text"
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.keys(state.weekDays).map((day: string, id: number) => (
            <DaySelector
              key={id}
              day={day}
              isSelected={state.weekDays[day as keyof typeof state.weekDays]}
              toggleDay={() =>
                dispatch({
                  type: "weekDays",
                  payload: {
                    ...state.weekDays,
                    [day]: !state.weekDays[day as keyof typeof state.weekDays],
                  },
                })
              }
            />
          ))}
        </div>
      </div>
    </CustomDialog>
  );
};

export default UpdaterDialog;
