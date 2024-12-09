import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { inputData, SingleSemester, userDetailstype } from "@/lib/type";
import SubmitComp from "./submit-comp";
import { ActionType } from "@/providers/data-provider";
import { Dispatch } from "react";
import { updateStatus } from "../_actions/getTodaysList";
import { toast } from "sonner";

type SingleAttendanceStatusProps = {
  course: inputData;
  user: userDetailstype;
  semExist: SingleSemester;
  todayCourses: inputData[];
  dispatch: Dispatch<ActionType>;
  isBackendProcessing: boolean;
};

const SingleAttendanceStatus = ({
  course,
  user,
  semExist,
  todayCourses,
  dispatch,
  isBackendProcessing,
}: SingleAttendanceStatusProps) => {
  const { present, absent } = course;
  const currentStatus = Math.round((present / (present + absent)) * 100) || 0;

  const handleSubmit = async (courseStatus: string) => {
    if (courseStatus === "Status!!!") return toast("Select a status");
    toast.message("Updating status...");
    const reponse = await updateStatus(user, course, courseStatus, semExist);
    if (reponse === "Failed") {
      toast.error("Failed to update status , sign out and try again");
      return;
    }
    dispatch({
      type: "SET_TODAY_COURSES",
      payload: todayCourses.map((c: inputData) =>
        c.IndivCourse !== course.IndivCourse
          ? c
          : {
              ...c,
              [courseStatus]: (c[courseStatus] as number) + 1,
            }
      ),
    });
    toast.success(`Status updated successfully for ${courseStatus}`);
  };

  return (
    <Card className="w-full bg-slate-400 bg-opacity-20 dark:bg-opacity-20 dark:bg-black rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex gap-2 items-center">
          <p className="text-[#8b8b8b]">{course.IndivCourse}</p>
          <span className="text-slate-400">|</span>
          <p className="text-slate-400">{currentStatus}%</p>
        </CardTitle>
        <CardDescription className="text-[#575757] mt-2">
          {course.timeofcourse}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex gap-4 justify-between">
        <SubmitComp
          course={course}
          user={user}
          semExist={semExist}
          todayCourses={todayCourses}
          dispatch={dispatch}
          isBackendProcessing={isBackendProcessing}
          handleSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default SingleAttendanceStatus;
