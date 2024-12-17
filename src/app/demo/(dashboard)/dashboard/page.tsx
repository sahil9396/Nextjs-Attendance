"use client";
import HomeComp from "@/newComponents/home/home";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const { demoTodayCourses, demoNotToday } = useDemoDataContext().state;
  const currentSem = useSearchParams().get("semester");

  const allCourses = demoTodayCourses.concat(demoNotToday).map((course) => ({
    ...course,
    Totaldays: course.Totaldays ?? 0,
    present: course.present ?? 0,
    criteria: course.criteria ?? 0,
  }));

  const coursesBelowCriteria = allCourses.filter(
    (course) =>
      (course.present / course.Totaldays) * 100 < course.criteria &&
      (course.present || course.absent)
  );

  const coursesAboveCriteria = allCourses.filter(
    (course) =>
      (course.present / course.Totaldays) * 100 >= course.criteria ||
      (!course.present && !course.absent)
  );

  const totalCourses = allCourses.length;

  return (
    <HomeComp
      coursesAboveCriteria={coursesAboveCriteria}
      coursesBelowCriteria={coursesBelowCriteria}
      totalCourses={totalCourses}
      allCourses={allCourses}
      demo={true}
      currentSem={currentSem}
    />
  );
}
