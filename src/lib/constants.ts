import { inputData } from "./type";

export const todayCourseDecider = 1;
// export const todayCourseDecider = new Date().getDay();

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const findCourseFromList = (courseList: inputData[], day: string) => {
  return courseList.find((course: any) => course.day === day);
};
