import { inputData } from "@/lib/type";
import React from "react";
import SingleAttendanceStatusDemo from "./_component/SingleAttendanceStatusDemo";

const Page = () => {
  const todayDemo: inputData[] = Array.from(
    { length: Math.random() * 5 + 1 },
    (_, i) => ({
      IndivCourse: `Course ${i + 1}`,
      Totaldays: Math.floor(Math.random() * 10),
      timeofcourse: "10:00 AM",
      present: Math.floor(Math.random() * 10),
      absent: Math.floor(Math.random() * 10),
      cancelled: Math.floor(Math.random() * 10),
      criteria: Math.floor(Math.random() * 100),
      thatday: ["Monday", "Tuesday", "Thursday"],
    })
  );
  return (
    <div className="w-full px-3 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center ">
      {todayDemo.map((item) => (
        <SingleAttendanceStatusDemo key={item.IndivCourse} course={item} />
      ))}
    </div>
  );
};

export default Page;
