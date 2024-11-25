"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { inputData } from "@/lib/type";
import { useRouter, useSearchParams } from "next/navigation";

const SingleCardDisplay = ({
  course,
  fromWhichList,
}: {
  course: inputData;
  fromWhichList: string;
}) => {
  const route = useRouter();
  const searchParm = useSearchParams();
  const currentSem = searchParm.get("semester");
  const selected = searchParm.get("selected");
  const {
    present,
    absent,
    cancelled,
    criteria,
    IndivCourse,
    timeofcourse,
    Totaldays,
    thatday,
  } = course;

  const nameNotDecided = [
    { label: "Total Days", value: Totaldays },
    { label: "Present", value: present },
    { label: "Absent", value: absent },
    { label: "Cancelled", value: cancelled },
    {
      label: "Criteria",
      value: `${criteria}%`,
      className: "place-content-center",
    },
  ];

  const currentStatus = Math.round((present / (present + absent)) * 100) || 0;
  const colorDecider = currentStatus >= criteria || !(present || absent);
  const commonClasses =
    "h-fit rounded-md overflow-hidden cursor-pointer transform transition-transform duration-300 lg:hover:scale-105 lg:hover:translate-y-4";

  return (
    <div
      onClick={() => {
        console.log(IndivCourse, fromWhichList);
        if (selected === IndivCourse) {
          route.push(`?semester=${currentSem}`);
          return;
        } else {
          route.push(
            `?semester=${currentSem}&selected=${IndivCourse}&today=${fromWhichList}`
          );
        }
      }}
      className={commonClasses}
    >
      <Card
        className={`bg-slate-400 bg-opacity-20 text-gray-800 dark:bg-black dark:bg-opacity-20 dark:text-white  ${
          selected === IndivCourse
            ? `${colorDecider ? "border-green-500" : "border-red-500"} border-2`
            : ""
        }`}
      >
        <CardHeader className="flex flex-col gap-4 p-4">
          <CardTitle className="text-xl font-semibold flex flex-wrap justify-center gap-5 items-center">
            <div className="flex justify-center gap-5">
              <p className="text-[#8b8b8b]">{IndivCourse.slice(0, 7)}</p>
              <p>|</p>
              <p className="text-slate-400">{currentStatus}%</p>
            </div>
          </CardTitle>
          <CardDescription className="text-[#575757] text-center md:text-start flex flex-wrap justify-center lg:justify-between gap-2">
            <p>{timeofcourse}</p>
            <p className="flex gap-4 text-[#717171]">
              {thatday.map((item: string) => (
                <span key={item}>{item.slice(0, 3)} </span>
              ))}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-5 items-center p-4">
          {nameNotDecided.map(({ label, value, className }, idx) => (
            <p
              key={idx}
              className={`text-center md:text-start w-full ${className || ""}`}
            >
              <span className="text-[#8b8b8b] mr-1">{label}</span>: {value}
            </p>
          ))}
        </CardContent>
        <CardFooter className="text-[#575757] flex justify-evenly p-4">
          {colorDecider ? (
            <p className="p-2 w-full flex justify-center">
              You can <span className="text-[#4dff00] mx-2">leave</span>{" "}
              {Math.round(present / 3)} classes !!!
            </p>
          ) : (
            <p className="p-2 w-full flex justify-center">
              {Totaldays < 3 * absent ? (
                "You are out of days"
              ) : (
                <>
                  You <span className="text-[#ff4d4d] mx-2">have</span>{" "}
                  {3 * absent} classes to go
                </>
              )}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleCardDisplay;
