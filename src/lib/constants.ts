import { contextype } from "@/providers/data-provider";
import { colorIdType, day, inputData } from "./type";

export const todayCourseDecider = 1;
// export const todayCourseDecider = new Date().getDay();

export const weekDays: day = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
};

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
