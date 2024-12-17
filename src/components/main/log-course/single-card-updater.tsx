"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDataContext } from "@/providers/data-provider";
import CourseDelete from "./course-delete";
import { inputData, SingleSemester } from "@/lib/type";
import {
  deleteCourse,
  updateList,
} from "@/lib/actions/log-courses-server-functions";
import UpdaterDialog from "@/components/global/custom-updater-dialog";
import { useMemo } from "react";

const SingleCardUpdater = () => {
  const { state, dispatch } = useDataContext();
  const pathName = usePathname().split("/").pop();
  const searchParam = useSearchParams();
  const currentSemester = searchParam.get("semester");
  const selected = searchParam.get("selected");
  const today: string | null = searchParam.get("today");
  const router = useRouter();

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

  if (
    pathName !== "courses" ||
    !selected ||
    !currentSemester ||
    state.todayCourses.length + state.notToday.length === 0
  ) {
    return null;
  }

  const handleDelete = async (semExists: SingleSemester) => {
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
    <div className="w-full bg-transparent text-white flex flex-col">
      <div className="h-full flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <CourseDelete
            isBackendProcessing={state.isBackendProcessing}
            semList={state.semesterInfo}
            selected={selected}
            today={today}
            currentSemester={currentSemester}
            funtionInbetween={handleDelete}
          />
          <UpdaterDialog
            thatCourse={thatCourse}
            currentSemester={currentSemester}
            courseName={selected}
            today={today}
            functionInbetween={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCardUpdater;
