import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { inputData } from "@/lib/type";
import SubmitComp from "./submit-comp";
import { toast } from "sonner";

type SingleAttendanceStatusProps = {
  course: inputData;
  isBackendProcessing: boolean;
  functionInbetween: (courseStatus: string, course: inputData) => void;
};

const SingleAttendanceStatus = ({
  course,
  isBackendProcessing,
  functionInbetween,
}: SingleAttendanceStatusProps) => {
  const { present, absent } = course;
  const currentStatus = Math.round((present / (present + absent)) * 100) || 0;

  const handleSubmit = async (courseStatus: string) => {
    if (courseStatus === "Status!!!") return toast("Select a status");
    toast.message("Updating status...");
    try {
      await functionInbetween(courseStatus, course);
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while updating status");
    }
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
          isBackendProcessing={isBackendProcessing}
          handleSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default SingleAttendanceStatus;
