import { contextype } from "@/providers/data-provider";
import { colorIdType, day, inputData } from "./type";
import { demoContextType } from "@/providers/demo-data-provider";

const todayDay = new Date().getDay();
export const todayCourseDecider = todayDay === 0 ? 6 : todayDay - 1;
export const weekDays: day = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
};

export const justWeekDays = Object.keys(weekDays);

// Helper function to get the current date in YYYY-MM-DD format.
export const getDate = () => {
  const today = new Date();
  const date = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear().toString();
  return `${year}-${month}-${date}`;
};

export const color_id: colorIdType = {
  present: "2",
  absent: "11",
  cancelled: "5",
};

export const findCourseFromList = (courseList: inputData[], day: string) => {
  return courseList.find((course: inputData) => course.IndivCourse === day);
};

export const helperForCourseSelect = (
  state: contextype,
  courseName: string
) => {
  const courseFetched = findCourseFromList(state.todayCourses, courseName);
  return courseFetched
    ? {
        thatCourse: courseFetched,
        fromList: "todayCourses",
      }
    : {
        thatCourse: findCourseFromList(state.notToday, courseName),
        fromList: "notToday",
      };
};

export const helperForCourseSelectDemo = (
  state: demoContextType,
  courseName: string
) => {
  const courseFetched = findCourseFromList(state.demoTodayCourses, courseName);
  return courseFetched
    ? {
        thatCourse: courseFetched,
        fromList: "todayCourses",
      }
    : {
        thatCourse: findCourseFromList(state.demoNotToday, courseName),
        fromList: "notToday",
      };
};
