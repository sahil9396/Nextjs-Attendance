"use client";
import { toast } from "sonner";
import { justWeekDays, todayCourseDecider} from "@/lib/constants";
import { inputData, SingleSemester } from "@/lib/type";
import { createCourse } from "../_actions/create-course-action";
import { useDataContext } from "@/providers/data-provider";
import { useSearchParams } from "next/navigation";
import CustomForm from "@/components/global/custom-form";
import { LoadingSpinner } from "@/components/global/load-spinner";

export function CreateCourse() {
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
      const createdCourse = await createCourse(
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
    <CustomForm
      todayCourses={state.todayCourses}
      notTodaycourse={state.notToday}
      currentSemester={currentSemester}
      semesterList={state.semesterInfo}
      functionInhandleSubmit={handleSubmit}
    />
  );
}
export default CreateCourse;
