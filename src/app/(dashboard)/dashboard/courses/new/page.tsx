"use client";
import { toast } from "sonner";
import { justWeekDays, todayCourseDecider } from "@/lib/constants";
import { inputData, SingleSemester } from "@/lib/type";
import { useDataContext } from "@/providers/data-provider";
import { useSearchParams } from "next/navigation";
import CustomForm from "@/components/global/custom-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createCourseForm } from "@/lib/actions/create-course-action";
import { LoadingSpinner } from "@/components/global/load-spinner";

function CreateCourse() {
  const { state, dispatch } = useDataContext();
  const currentSemester = useSearchParams().get("semester");

  if (state.isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  const handleSubmit = async (
    courseData: inputData,
    courseDays: string[],
    semExists: SingleSemester
  ) => {
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: true });
    toast(`Wait till Course is being Created `);
    try {
      const createdCourse = await createCourseForm(
        state.user,
        courseData,
        courseDays,
        semExists
      );
      if (createdCourse === "course Already exists!!!") {
        toast.error(`Course with the same name already exists :)`);
        dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: false });
        return;
      }
      if (courseDays.includes(justWeekDays.at(todayCourseDecider) || "")) {
        dispatch({
          type: "SET_TODAY_COURSES",
          payload: [...state.todayCourses, courseData],
        });
      } else {
        dispatch({
          type: "SET_NOT_TODAY",
          payload: [...state.notToday, courseData],
        });
      }
      dispatch({
        type: "SET_ZERO_COURSES",
        payload: false,
      });
    } catch (error) {
      toast.error(`${error}`);
    }
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: false });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:px-8 md:py-4">
      <header className="md:flex hidden items-center justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold">Create Course</h1>
        <Button asChild className="justify-start" variant={"secondary"}>
          <Link
            href={
              currentSemester
                ? `/dashboard/courses?semester=${currentSemester}`
                : `/dashboard/courses`
            }
            className="flex items-center"
          >
            Back
          </Link>
        </Button>
      </header>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <CustomForm
            todayCourses={state.todayCourses}
            notTodaycourse={state.notToday}
            currentSemester={currentSemester}
            semesterList={state.semesterInfo}
            functionInhandleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
export default CreateCourse;
