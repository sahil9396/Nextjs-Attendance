import React from "react";
import CourseupdateDeleteButton from "./global/courseupdateDeleteButton";
import SingleCardDisplay from "@/components/main/log-course/single-card-display";
import { inputData, SingleSemester } from "@/lib/type";

type Props = {
  searchParamsFilteredCoursesToday: inputData[];
  searchParamsFilteredCoursesdemoNotToday: inputData[];
  thatCourse: inputData | undefined;
  currentSemester: string | null;
  today: string | null;
  selected: string | null;
  isBackendProcessing: boolean;
  satisfiesemesterInfo: SingleSemester[];
  handleDelete: (value: SingleSemester) => void;
  handleSubmit: (
    updatedCourse: inputData,
    eligibleForToday: boolean,
    dayListSame: boolean
  ) => void;
  demo?: boolean;
};

const CoursesList = ({
  searchParamsFilteredCoursesToday,
  searchParamsFilteredCoursesdemoNotToday,
  thatCourse,
  currentSemester,
  today,
  selected,
  isBackendProcessing,
  satisfiesemesterInfo,
  handleDelete,
  handleSubmit,
  demo,
}: Props) => {
  const linkHref =
    (demo ? "/demo" : "") +
    (currentSemester
      ? selected && today
        ? `/dashboard/courses/new?semester=${currentSemester}&selected=${selected}&today=${today}`
        : `/dashboard/courses/new?semester=${currentSemester}`
      : `/dashboard/courses/new`);

  const noCourses =
    searchParamsFilteredCoursesToday.length +
      searchParamsFilteredCoursesdemoNotToday.length ===
    0;
  return (
    <div className="flex flex-col gap-6 p-4 md:px-8 md:py-4">
      <div className="w-full hidden md:flex">
        <CourseupdateDeleteButton
          linkHref={linkHref}
          noCourses={noCourses}
          selected={selected}
          currentSemester={currentSemester}
          today={today}
          thatCourse={thatCourse}
          isBackendProcessing={isBackendProcessing}
          SemesterInfo={satisfiesemesterInfo}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {searchParamsFilteredCoursesToday.map((item) => (
          <SingleCardDisplay
            key={item.IndivCourse}
            course={item}
            fromWhichList={"true"}
            selectedCourse={thatCourse?.IndivCourse}
            currentSem={currentSemester}
          />
        ))}
        {searchParamsFilteredCoursesdemoNotToday.map((item) => (
          <SingleCardDisplay
            key={item.IndivCourse}
            course={item}
            fromWhichList={"false"}
            selectedCourse={thatCourse?.IndivCourse}
            currentSem={currentSemester}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
