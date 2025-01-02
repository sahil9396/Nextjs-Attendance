"use client";
import { LoadingSpinner } from "@/components/global/load-spinner";
import HomeComp from "@/newComponents/home/home";
import { useDataContext } from "@/providers/data-provider";
import { useSearchParams } from "next/navigation";

{
  /* <div className="mt-2 flex items-center gap-2 text-sm">
          {present && absent && Totaldays ? (
            isAboveCriteria ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <p>
                  can leave <span>{Math.round(present / 3)} classes !!!</span>{" "}
                </p>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-500" />
                <p>
                  {Totaldays < 3 * absent
                    ? "are out of days"
                    : `have ${3 * absent} classes to go`}
                </p>
              </>
            )
          ) : (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <p>You can&apos;t leave though</p>
            </>
          )}
        </div> */
}

export const runtime = "edge";

const attndanceCalculate = (present: number, absent: number) => {
  return Math.round((present * 100) / (present + absent)) || 0;
};

export default function DashboardPage() {
  const { todayCourses, notToday, isLoading } = useDataContext().state;
  const currentSem = useSearchParams().get("semester");

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  const allCourses = todayCourses.concat(notToday).map((course) => ({
    ...course,
    Totaldays: course.Totaldays ?? 0,
    present: course.present ?? 0,
    criteria: course.criteria ?? 0,
  }));

  const coursesBelowCriteria = allCourses.filter(
    (course) =>
      attndanceCalculate(course.present, course.absent) < course.criteria &&
      (course.present || course.absent)
  );

  const coursesAboveCriteria = allCourses.filter(
    (course) =>
      attndanceCalculate(course.present, course.absent) >= course.criteria ||
      (!course.present && !course.absent)
  );

  const totalCourses = allCourses.length;

  return (
    <HomeComp
      coursesAboveCriteria={coursesAboveCriteria}
      coursesBelowCriteria={coursesBelowCriteria}
      totalCourses={totalCourses}
      allCourses={allCourses}
      demo={false}
      currentSem={currentSem}
    />
  );
}
