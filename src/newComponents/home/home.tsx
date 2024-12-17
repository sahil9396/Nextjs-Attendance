import React from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { inputData } from "@/lib/type";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  allCourses: inputData[];
  coursesAboveCriteria: inputData[];
  coursesBelowCriteria: inputData[];
  totalCourses: number;
  demo?: boolean;
  currentSem: string | null;
};

const HomeComp = ({
  allCourses,
  coursesAboveCriteria,
  coursesBelowCriteria,
  totalCourses,
  demo,
  currentSem,
}: Props) => {
  if (totalCourses === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="mb-4 text-sm md:text-lg font-medium text-muted-foreground">
          No courses available. Start tracking your attendance by adding new
          courses.
        </p>
        <Link
          href={
            currentSem
              ? demo
                ? `/demo/dashboard/courses/new?semester=${currentSem}`
                : `/dashboard/courses/new?semester=${currentSem}`
              : demo
              ? "/demo/dashboard/courses/new"
              : "/dashboard/courses/new"
          }
        >
          <Button className="flex items-center justify-center gap-1">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Course
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 md:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Overall Attendance</h3>
          <div className="space-y-2">
            <Progress
              value={
                (allCourses.reduce((acc, course) => acc + course.present, 0) /
                  allCourses.reduce(
                    (acc, course) => acc + course.Totaldays,
                    0
                  )) *
                100
              }
              className="h-2"
            />
            <p className="text-sm text-muted-foreground">
              {(
                (allCourses.reduce((acc, course) => acc + course.present, 0) /
                  allCourses.reduce(
                    (acc, course) => acc + course.Totaldays,
                    0
                  )) *
                100
              ).toFixed(2) || 0}
              % of classes attended
            </p>
          </div>
        </Card>

        <Card className="p-6 text-sm md:text-md">
          <h3 className="mb-4 text-lg font-semibold">Attendance Summary</h3>
          <Alert
            variant="default"
            className="border-green-500 bg-green-50 dark:bg-green-900/20"
          >
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Courses Above Criteria</AlertTitle>
            <AlertDescription>
              {coursesAboveCriteria.length} out of {totalCourses} courses are on
              track.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Courses Below Criteria</AlertTitle>
            <AlertDescription>
              {coursesBelowCriteria.length} out of {totalCourses} courses need
              attention.
            </AlertDescription>
          </Alert>
        </Card>
      </div>

      <Card className="p-6 w-full md:w-[450px]">
        <h3 className="mb-4 text-lg font-semibold">Detailed Report</h3>
        <ul className="space-y-2">
          {allCourses.map((course, index) => {
            const attendancePercentage =
              Math.round(
                (course.present * 100) / (course.present + course.absent)
              ) || 0;
            return (
              <li key={index}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {course.IndivCourse || "Unnamed Course"}
                  </span>
                  <span
                    className={`text-sm ${
                      attendancePercentage >= course.criteria ||
                      (!course.present && !course.absent)
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {attendancePercentage.toFixed(2)}% attendance
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default HomeComp;
