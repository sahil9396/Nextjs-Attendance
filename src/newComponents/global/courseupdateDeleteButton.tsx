import React from "react";
import { inputData, SingleSemester } from "@/lib/type";
import Link from "next/link";
import CourseDelete from "@/components/main/log-course/course-delete";
import UpdaterDialog from "@/components/global/custom-updater-dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
type Props = {
  linkHref: string;
  noCourses: boolean;
  selected: string | null;
  currentSemester: string | null;
  today: string | null;
  thatCourse: inputData | undefined;
  isBackendProcessing: boolean;
  SemesterInfo: SingleSemester[];
  handleDelete: (value: SingleSemester) => void;
  handleSubmit: (
    updatedCourse: inputData,
    eligibleForToday: boolean,
    dayListSame: boolean
  ) => void;
};

const CourseupdateDeleteButton = ({
  linkHref,
  noCourses,
  selected,
  currentSemester,
  today,
  thatCourse,
  isBackendProcessing,
  SemesterInfo,
  handleDelete,
  handleSubmit,
}: Props) => {
  return (
    <div className=" w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
      <Link className=" w-full md:w-fit" href={linkHref}>
        <Button
          variant={"outline"}
          className="w-full items-center justify-center border border-gray-500 gap-1"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </Link>
      {noCourses || !selected || !currentSemester ? null : (
        <div className="w-fit flex flex-row justify-center items-center gap-2">
          <CourseDelete
            isBackendProcessing={isBackendProcessing}
            semList={SemesterInfo}
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
      )}
    </div>
  );
};

export default CourseupdateDeleteButton;
