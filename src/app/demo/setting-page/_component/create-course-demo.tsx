"use client";
import CustomForm from "@/components/global/custom-form";
import { justWeekDays, todayCourseDecider } from "@/lib/constants";
import { inputData } from "@/lib/type";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function CreateCourseDemo() {
  const { state, dispatch } = useDemoDataContext();
  const currentSemester = useSearchParams().get("semester") || "semester-1";

  const handleSubmit = async (courseData: inputData, courseDays: string[]) => {
    dispatch({ type: "SET_DEMO_IS_BACKEND_PROCESSING", payload: true });
    toast(`Wait till Course is being Created `);
    try {
      if (courseDays.includes(justWeekDays.at(todayCourseDecider) || "")) {
        dispatch({
          type: "SET_DEMO_TODAY_COURSES",
          payload: [...state.demoTodayCourses, courseData],
        });
      } else {
        dispatch({
          type: "SET_DEMO_NOT_TODAY",
          payload: [...state.demoNotToday, courseData],
        });
      }
      dispatch({
        type: "SET_DEMO_ZERO_COURSES",
        payload: false,
      });
    } catch (error) {
      toast.error(`${error}`);
    }
    dispatch({ type: "SET_DEMO_IS_BACKEND_PROCESSING", payload: false });
    toast.success(`Course Created Successfully`);
  };
  return (
    <CustomForm
      todayCourses={state.demoTodayCourses}
      notTodaycourse={state.demoNotToday}
      currentSemester={currentSemester}
      semesterList={state.demoSemesterInfo}
      functionInhandleSubmit={handleSubmit}
    />
  );
}
export default CreateCourseDemo;
