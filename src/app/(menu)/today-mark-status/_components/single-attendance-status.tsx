import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { inputData, userDetailstype } from "@/lib/type";
import SubmitComp from "./submit-comp";
import { ActionType, SingleSemester } from "@/providers/data-provider";
import { Dispatch } from "react";

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
        />
      </CardContent>
    </Card>
  );
};

export default SingleAttendanceStatus;
