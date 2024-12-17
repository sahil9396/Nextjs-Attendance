"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { inputData } from "@/lib/type";
import CoursesList from "@/newComponents/coursesList";

export default function CoursesPage() {
  const { state, dispatch } = useDemoDataContext();
  const searchParam = useSearchParams();
  const currentSemester = searchParam.get("semester");
  const selected: string | null = searchParam.get("selected");
  const today: string | null = searchParam.get("today");
  const router = useRouter();

  // Combine and sanitize course data
  const demoSearchParamsFilteredCoursesToday = useMemo(() => {
    if (state.demoSearchParam === "") return state.demoTodayCourses;
    return state.demoTodayCourses.filter(
      (course) =>
        course.IndivCourse.toLowerCase() === state.demoSearchParam.toLowerCase()
    );
  }, [state.demoSearchParam, state.demoTodayCourses]);

  const demoSearchParamsFilteredCoursesdemoNotToday = useMemo(() => {
    if (state.demoSearchParam === "") return state.demoNotToday;
    return state.demoNotToday.filter(
      (course) =>
        course.IndivCourse.toLowerCase() === state.demoSearchParam.toLowerCase()
    );
  }, [state.demoSearchParam, state.demoNotToday]);

  const thatCourse = useMemo(() => {
    if (today === "true") {
      return state.demoTodayCourses.find(
        (course: inputData) => course.IndivCourse === selected
      );
    }
    return state.demoNotToday.find(
      (course: inputData) => course.IndivCourse === selected
    );
  }, [selected, state.demoTodayCourses, state.demoNotToday, today]);

  const noCourses =
    state.demoTodayCourses.length + state.demoNotToday.length === 0;

  const handleDelete = async () => {
    if (today === "true") {
      const updatedList = state.demoTodayCourses.filter(
        (course: inputData) => course.IndivCourse !== selected
      );

      dispatch({
        type: "SET_DEMO_TODAY_COURSES",
        payload: updatedList,
      });
    } else {
      const updatedList = state.demoNotToday.filter(
        (course: inputData) => course.IndivCourse !== selected
      );
      dispatch({
        type: "SET_DEMO_NOT_TODAY",
        payload: updatedList,
      });
    }
  };

  const handleSubmit = async (
    updatedCourse: inputData,
    eligibleForToday: boolean
  ) => {
    if (today === "true") {
      if (eligibleForToday) {
        const updatedList = state.demoTodayCourses.map((course: inputData) =>
          course.IndivCourse === selected ? updatedCourse : course
        );
        dispatch({
          type: "SET_DEMO_TODAY_COURSES",
          payload: updatedList,
        });
      } else {
        const updatedTodayList = state.demoTodayCourses.filter(
          (course: inputData) => course.IndivCourse !== selected
        );
        dispatch({
          type: "SET_DEMO_TODAY_AND_NOT_TODAY_COURSES",
          payload: {
            today: updatedTodayList,
            notToday: [...state.demoNotToday, updatedCourse],
          },
        });
      }
    } else {
      if (eligibleForToday) {
        const updatedNotTodayList = state.demoNotToday.filter(
          (course) => course.IndivCourse !== selected
        );
        dispatch({
          type: "SET_DEMO_TODAY_AND_NOT_TODAY_COURSES",
          payload: {
            today: [...state.demoTodayCourses, updatedCourse],
            notToday: updatedNotTodayList,
          },
        });
      } else {
        const updatedList = state.demoNotToday.map((course) =>
          course.IndivCourse === selected ? updatedCourse : course
        );
        dispatch({
          type: "SET_DEMO_NOT_TODAY",
          payload: updatedList,
        });
      }
    }
    router.push(`?semester=${currentSemester}`);
  };

  if (noCourses) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="mb-4 text-sm lg:text-lg font-medium text-muted-foreground">
          No courses available. Start tracking your attendance by adding new
          courses.
        </p>
        <Link href="/dashboard/courses/new">
          <Button className="flex items-center justify-center gap-1">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Course
          </Button>
        </Link>
      </div>
    );
  }

  if (
    state.demoSearchParam !== "" &&
    demoSearchParamsFilteredCoursesToday.length +
      demoSearchParamsFilteredCoursesdemoNotToday.length ===
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

  return (
    <CoursesList
      searchParamsFilteredCoursesToday={demoSearchParamsFilteredCoursesToday}
      searchParamsFilteredCoursesdemoNotToday={
        demoSearchParamsFilteredCoursesdemoNotToday
      }
      thatCourse={thatCourse}
      currentSemester={currentSemester}
      today={today}
      selected={selected}
      isBackendProcessing={state.demoIsBackendProcessing}
      satisfiesemesterInfo={state.demoSemesterInfo}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
    />
  );
}
