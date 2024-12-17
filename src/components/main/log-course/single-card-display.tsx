"use client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { inputData } from "@/lib/type";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const SingleCardDisplay = ({
  course,
  fromWhichList,
  selectedCourse,
  currentSem,
}: {
  course: inputData;
  fromWhichList: string;
  selectedCourse: string | undefined | null;
  currentSem: string | undefined | null;
}) => {
  const route = useRouter();
  const { present, absent, criteria, IndivCourse, Totaldays } = course;
  const attendancePercentage = (present / (absent + present)) * 100 || 0;
  const isAboveCriteria = attendancePercentage >= criteria;

  const handleClick = () => {
    if (selectedCourse === IndivCourse) {
      if (!currentSem || currentSem === "null") {
        route.push(`?`);
        return;
      }
      route.push(`?semester=${currentSem}`);
    } else {
      route.push(
        `?semester=${currentSem}&selected=${IndivCourse}&today=${fromWhichList}`
      );
    }
  };

  return (
    <Card
      onClick={handleClick}
      key={IndivCourse}
      className={`p-6 flex flex-col justify-between ${
        selectedCourse === IndivCourse
          ? isAboveCriteria
            ? "border-green-500"
            : "border-red-500"
          : ""
      }  `}
    >
      <div>
        <h3 className="text-lg font-semibold">{IndivCourse}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm">
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
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Attendance</span>
            <span>{attendancePercentage.toFixed(1)}%</span>
          </div>
          <Progress value={attendancePercentage || 0} className="h-2" />
        </div>
      </div>

      <div className="mt-6 text-sm flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="font-medium">Required</span>
          <span className="font-medium">{criteria}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Present</span>
          <span className="font-medium">{present} Classes</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Absent</span>
          <span className="font-medium">{absent} Classes</span>
        </div>
      </div>
      
      <div className="mt-6 flex gap-2 flex-wrap">
        {course.thatday.map((day: string) => (
          <p
            key={day}
            className="text-xs text-muted-foreground bg-gray-100 p-1 rounded"
          >
            {day}
          </p>
        ))}
      </div>
    </Card>
  );
};

export default SingleCardDisplay;
