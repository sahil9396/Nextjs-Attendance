"use client";
import { toast } from "sonner";
import { justWeekDays, todayCourseDecider } from "@/lib/constants";
import { inputData } from "@/lib/type";
import { useSearchParams } from "next/navigation";
import CustomForm from "@/components/global/custom-form";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function CreateCourseNew() {
  const { state, dispatch } = useDemoDataContext();
  const currentSemester = useSearchParams().get("semester");

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
    <div className="flex flex-col gap-6 p-4 md:px-8 md:py-4">
      <header className="flex items-center justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold">Create Course</h1>
        <Button
          asChild
          className=" w-fit flex justify-start"
          variant={"secondary"}
        >
          <Link
            href={
              currentSemester
                ? `/demo/dashboard/courses?semester=${currentSemester}`
                : `/demo/dashboard/courses`
            }
          >
            Back
          </Link>
        </Button>
      </header>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <CustomForm
            todayCourses={state.demoTodayCourses}
            notTodaycourse={state.demoNotToday}
            currentSemester={currentSemester}
            semesterList={state.demoSemesterInfo}
            functionInhandleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
export default CreateCourseNew;
