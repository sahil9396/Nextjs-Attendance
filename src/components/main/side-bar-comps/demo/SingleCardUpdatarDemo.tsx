"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import { inputData } from "@/lib/type";
import { useMemo } from "react";
import CourseupdateDeleteButton from "@/newComponents/global/courseupdateDeleteButton";

const SingleCardUpdatarDemo = () => {
  const { state, dispatch } = useDemoDataContext();
  const pathName = usePathname().split("/").pop();
  const searchParam = useSearchParams();
  const currentSemester = searchParam.get("semester");
  const selected = searchParam.get("selected");
  const today: string | null = searchParam.get("today");
  const router = useRouter();

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

  if (
    pathName !== "courses" ||
    !currentSemester ||
    state.demoTodayCourses.length + state.demoNotToday.length === 0
  ) {
    return null;
  }

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

  const linkHref = currentSemester
    ? selected && today
      ? `/dashboard/courses/new?semester=${currentSemester}&selected=${selected}&today=${today}`
      : `/dashboard/courses/new?semester=${currentSemester}`
    : `/dashboard/courses/new`;

  return (
    <div className=" md:hidden flex w-full">
      <CourseupdateDeleteButton
        linkHref={linkHref}
        noCourses={
          state.demoTodayCourses.length + state.demoNotToday.length === 0
        }
        selected={selected}
        currentSemester={currentSemester}
        today={today}
        thatCourse={thatCourse}
        isBackendProcessing={state.demoIsBackendProcessing}
        SemesterInfo={state.demoSemesterInfo}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default SingleCardUpdatarDemo;
