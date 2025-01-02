"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { inputData, SingleSemester } from "@/lib/type";
import CoursesList from "@/newComponents/coursesList";
import { useDataContext } from "@/providers/data-provider";
import {
  deleteCourse,
  updateList,
} from "@/lib/actions/log-courses-server-functions";
import { LoadingSpinner } from "@/components/global/load-spinner";

export const runtime = "edge";

export default function CoursesPage() {
  const { state, dispatch } = useDataContext();
  const searchParam = useSearchParams();
  const currentSemester = searchParam.get("semester");
  const selected: string | null = searchParam.get("selected");
  const today: string | null = searchParam.get("today");
  const router = useRouter();

  const searchParamsFilteredCoursesToday = useMemo(() => {
    if (state.searchParam === "") return state.todayCourses;
    return state.todayCourses.filter(
      (course) =>
        course.IndivCourse.toLowerCase() === state.searchParam.toLowerCase()
    );
  }, [state.searchParam, state.todayCourses]);

  const searchParamsFilteredCoursenotToday = useMemo(() => {
    if (state.searchParam === "") return state.notToday;
    return state.notToday.filter(
      (course) =>
        course.IndivCourse.toLowerCase() === state.searchParam.toLowerCase()
    );
  }, [state.searchParam, state.notToday]);

  const thatCourse = useMemo(() => {
    if (today === "true") {
      return state.todayCourses.find(
        (course: inputData) => course.IndivCourse === selected
      );
    }
    return state.notToday.find(
      (course: inputData) => course.IndivCourse === selected
    );
  }, [selected, state.todayCourses, state.notToday, today]);

  const noCourses = state.todayCourses.length + state.notToday.length === 0;

  if (state.isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  if (noCourses) {
    const linkHref = currentSemester
      ? `/dashboard/courses/new?semester=${currentSemester}`
      : "/dashboard/courses/new";

    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="mb-4 text-sm lg:text-lg font-medium text-muted-foreground">
          No courses available. Start tracking your attendance by adding new
          courses.
        </p>
        <Link href={linkHref}>
          <Button className="flex items-center justify-center gap-1">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Course
          </Button>
        </Link>
      </div>
    );
  }

  if (
    state.searchParam !== "" &&
    searchParamsFilteredCoursesToday.length +
      searchParamsFilteredCoursenotToday.length ===
      0
  ) {
    return (
      <div className="flex flex-col gap-6 p-4 md:px-8 md:py-4">
        <div className="p-6 border rounded-lg">
          <p className="text-center text-muted-foreground">
            No classes found for the search term
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = async (semExists: SingleSemester) => {
    if (!selected || !currentSemester || !today) return null;
    await deleteCourse(semExists, state.user, selected);
    if (today === "true") {
      const updatedList = state.todayCourses.filter(
        (course: inputData) => course.IndivCourse !== selected
      );

      dispatch({
        type: "SET_TODAY_COURSES",
        payload: updatedList,
      });
    } else {
      const updatedList = state.notToday.filter(
        (course: inputData) => course.IndivCourse !== selected
      );
      dispatch({
        type: "SET_NOT_TODAY",
        payload: updatedList,
      });
    }
  };

  const handleSubmit = async (
    updatedCourse: inputData,
    eligibleForToday: boolean,
    dayListSame: boolean
  ) => {
    if (!currentSemester || !selected || !today) return null;

    const semExists = state.semesterInfo.find(
      (sem) => sem.semester === currentSemester
    );

    if (!semExists) return null;

    await updateList(semExists, state.user, updatedCourse, dayListSame);

    if (today === "true") {
      if (eligibleForToday) {
        const updatedList = state.todayCourses.map((course: inputData) =>
          course.IndivCourse === selected ? updatedCourse : course
        );
        dispatch({
          type: "SET_TODAY_COURSES",
          payload: updatedList,
        });
      } else {
        const updatedTodayList = state.todayCourses.filter(
          (course: inputData) => course.IndivCourse !== selected
        );
        dispatch({
          type: "SET_TODAY_AND_NOT_TODAY_COURSES",
          payload: {
            today: updatedTodayList,
            notToday: [...state.notToday, updatedCourse],
          },
        });
      }
    } else {
      if (eligibleForToday) {
        const updatedNotTodayList = state.notToday.filter(
          (course) => course.IndivCourse !== selected
        );
        dispatch({
          type: "SET_TODAY_AND_NOT_TODAY_COURSES",
          payload: {
            today: [...state.todayCourses, updatedCourse],
            notToday: updatedNotTodayList,
          },
        });
      } else {
        const updatedList = state.notToday.map((course) =>
          course.IndivCourse === selected ? updatedCourse : course
        );
        dispatch({
          type: "SET_NOT_TODAY",
          payload: updatedList,
        });
      }
    }
    router.push(`?semester=${currentSemester}`);
  };

  return (
    <CoursesList
      searchParamsFilteredCoursesToday={searchParamsFilteredCoursesToday}
      searchParamsFilteredCoursesdemoNotToday={
        searchParamsFilteredCoursenotToday
      }
      thatCourse={thatCourse}
      currentSemester={currentSemester}
      today={today}
      selected={selected}
      isBackendProcessing={state.isBackendProcessing}
      satisfiesemesterInfo={state.semesterInfo}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
    />
  );
}
