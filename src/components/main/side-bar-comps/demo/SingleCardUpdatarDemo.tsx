"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CourseDelete from "../../log-course/course-delete";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import { inputData } from "@/lib/type";
import { useMemo } from "react";
import UpdaterDialog from "@/components/global/custom-updater-dialog";

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
    pathName !== "list-course" ||
    !selected ||
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

  return (
    <div className="w-full bg-transparent text-white flex flex-col">
      <div className="h-full flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <CourseDelete
            isBackendProcessing={state.demoIsBackendProcessing}
            semList={state.demoSemesterInfo}
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

export default SingleCardUpdatarDemo;