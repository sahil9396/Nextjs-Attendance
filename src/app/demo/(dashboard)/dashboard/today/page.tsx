"use client";
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/global/custom-button";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ExtraClass from "@/components/main/today-attendance/Extra_class";
import SingleAttendanceStatus from "@/components/main/today-attendance/single-attendance-status";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import { inputData } from "@/lib/type";
import { useMemo } from "react";

export default function TodayPage() {
  const { state, dispatch } = useDemoDataContext();
  const currentSem = useSearchParams().get("semester");

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long" });

  const searchedCourses = useMemo(() => {
    if (state.demoSearchParam === "") return state.demoTodayCourses;
    return state.demoTodayCourses.filter(
      (course) =>
        course.IndivCourse.toLowerCase() === state.demoSearchParam.toLowerCase()
    );
  }, [state.demoSearchParam, state.demoTodayCourses]);

  const handleUpdateStatus = async (status: string) => {
    const semExist = state.demoSemesterInfo.find(
      (sem) => sem.semester === currentSem
    );
    if (!semExist || !state.demoUser) return;
    const courseNameAlreadyDone = state.demoTodayStatusDone.courseNames.map(
      (course) => course
    );
    const courseToBeDone = state.demoTodayCourses.filter(
      (course) => !courseNameAlreadyDone.includes(course.IndivCourse)
    );
    toast.message("Updating status...");
    try {
      dispatch({
        type: "SET_DEMO_TODAY_COURSES",
        payload: courseToBeDone
          .map((course) => ({
            ...course,
            [status]: (course[status] as number) + 1,
          }))
          .concat(
            state.demoTodayCourses.filter((course) =>
              courseNameAlreadyDone.includes(course.IndivCourse)
            )
          ),
      });
      dispatch({
        type: "SET_DEMO_TODAY_STATUS_DONE",
        payload: {
          date: today,
          courseNames: [
            ...state.demoTodayStatusDone.courseNames,
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

  const semExist = state.demoSemesterInfo.find(
    (item) => item.semester === currentSem
  );

  if (state.demoSearchParam !== "" && searchedCourses.length === 0) {
    return (
      <div className="flex flex-col gap-6 p-4 md:px-8 md:py-4">
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            No classes found for the search term
          </p>
        </Card>
      </div>
    );
  }

  if (state.demoTodayCourses.length === 0 || !semExist) {
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

  const handleSubmit = async (courseStatus: string, course: inputData) => {
    dispatch({
      type: "SET_DEMO_TODAY_COURSES",
      payload: state.demoTodayCourses.map((c: inputData) =>
        c.IndivCourse !== course.IndivCourse
          ? c
          : {
              ...c,
              [courseStatus]: (c[courseStatus] as number) + 1,
            }
      ),
    });
    dispatch({
      type: "SET_DEMO_TODAY_STATUS_DONE",
      payload: {
        date: state.demoTodayStatusDone.courseNames[0],
        courseNames: [
          ...state.demoTodayStatusDone.courseNames,
          course.IndivCourse,
        ],
      },
    });
    toast.success(`Status updated successfully for ${course.IndivCourse}`);
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
              state.demoIsBackendProcessing ||
              state.demoTodayCourses.length ===
                state.demoTodayStatusDone.courseNames.length
            }
          />
        ))}
        <div className="w-fit">
          <ExtraClass />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchedCourses.map((course) => (
          <SingleAttendanceStatus
            key={course.IndivCourse}
            course={course}
            functionInbetween={handleSubmit}
            isBackendProcessing={
              state.demoIsBackendProcessing ||
              state.demoTodayStatusDone.courseNames.includes(course.IndivCourse)
            }
          />
        ))}
      </div>
    </div>
  );
}
