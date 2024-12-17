"use client";

import { Card } from "@/components/ui/card";
import CustomButton from "@/components/global/custom-button";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useDataContext } from "@/providers/data-provider";
import { LoadingSpinner } from "@/components/global/load-spinner";
import ExtraClass from "@/components/main/today-attendance/Extra_class";
import { updateAllCourses } from "@/lib/actions/log-courses-server-functions";
import SingleAttendanceStatus from "@/components/main/today-attendance/single-attendance-status";
import { updateStatus } from "@/lib/actions/getTodaysList";
import { inputData } from "@/lib/type";

export default function TodayPage() {
  const { state, dispatch } = useDataContext();
  const currentSem = useSearchParams().get("semester");

  if (state.isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  const semExist = state.semesterInfo.find(
    (item) => item.semester === currentSem
  );

  if (state.todayCourses.length === 0 || !semExist) {
    return (
      <div className="flex flex-col gap-6 p-4 md:px-8 md:py-4">
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            No classes scheduled for today
          </p>
        </Card>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long" });

  const buttonList = [
    {
      value: "present",
      content: "All present",
      className: "border-green-500 text-green-500 lg:hover:bg-green-50",
    },
    {
      value: "absent",
      content: "All absent",
      className: "border-red-500 text-red-500 lg:hover:bg-red-50",
    },
    {
      value: "cancelled",
      content: "All cancelled",
      className: "border-yellow-500 text-yellow-500 lg:hover:bg-yellow-50",
    },
  ];

  const handleUpdateStatus = async (status: string) => {
    const semExist = state.semesterInfo.find(
      (sem) => sem.semester === currentSem
    );
    if (!semExist || !state.user) return;
    const courseNameAlreadyDone = state.todayStatusDone.courseNames.map(
      (course) => course
    );
    const courseToBeDone = state.todayCourses.filter(
      (course) => !courseNameAlreadyDone.includes(course.IndivCourse)
    );
    toast.message("Updating status...");
    try {
      const courses = state.todayCourses.map((course) => ({
        courseName: course.IndivCourse,
        status,
        prev: course[status as "present" | "absent" | "cancelled"],
        pre: course.present,
        ab: course.absent,
        can: course.cancelled,
      }));
      const reponse = await updateAllCourses(
        semExist,
        state.user,
        status,
        courses
      );
      if (reponse === "Failed") {
        toast.error("Failed to update status , sign out and try again");
        return;
      }
      dispatch({
        type: "SET_TODAY_COURSES",
        payload: courseToBeDone
          .map((course) => ({
            ...course,
            [status]: (course[status] as number) + 1,
          }))
          .concat(
            state.todayCourses.filter((course) =>
              courseNameAlreadyDone.includes(course.IndivCourse)
            )
          ),
      });
      dispatch({
        type: "SET_TODAY_STATUS_DONE",
        payload: {
          date: today,
          courseNames: [
            ...state.todayStatusDone.courseNames,
            ...courseToBeDone.map((course) => course.IndivCourse),
          ],
        },
      });
      toast.success("Status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while updating status");
    }
  };

  const handleSubmit = async (courseStatus: string, course: inputData) => {
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: true });
    const reponse = await updateStatus(
      state.user,
      course,
      courseStatus,
      semExist
    );
    if (reponse === "Failed") {
      toast.error("Failed to update status , sign out and try again");
      return reponse;
    } else {
      dispatch({
        type: "SET_TODAY_COURSES",
        payload: state.todayCourses.map((c: inputData) =>
          c.IndivCourse !== course.IndivCourse
            ? c
            : {
                ...c,
                [courseStatus]: (c[courseStatus] as number) + 1,
              }
        ),
      });
      dispatch({
        type: "SET_TODAY_STATUS_DONE",
        payload: {
          date: state.todayStatusDone.courseNames[0],
          courseNames: [
            ...state.todayStatusDone.courseNames,
            course.IndivCourse,
          ],
        },
      });
      toast.success(`Status updated successfully for ${course.IndivCourse}`);
    }
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: false });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:px-8 md:py-4">
      <div className="w-full md:w-fit hidden md:flex flex-wrap justify-center gap-5">
        {buttonList.map((button) => (
          <CustomButton
            key={button.value}
            value={button.value}
            variant={"outline"}
            className={`${button.className} w-36`}
            content={button.content}
            onClick={() => handleUpdateStatus(button.value)}
            disabled={
              state.isBackendProcessing ||
              state.todayCourses.length ===
                state.todayStatusDone.courseNames.length
            }
          />
        ))}
        <div className="w-fit">
          <ExtraClass />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.todayCourses.map((course) => (
          <SingleAttendanceStatus
            key={course.IndivCourse}
            course={course}
            functionInbetween={handleSubmit}
            isBackendProcessing={
              state.isBackendProcessing ||
              state.todayStatusDone.courseNames.includes(course.IndivCourse)
            }
          />
        ))}
      </div>
    </div>
  );
}
