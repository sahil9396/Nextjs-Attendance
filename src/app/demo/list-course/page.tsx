import SingleCardDisplay from "@/app/(menu)/list-course/_components/single-card-display";
import { inputData } from "@/lib/type";
import React from "react";

const Page = () => {
  const demoList: inputData[] = Array.from({ length: 10 }, (_, i) => ({
    IndivCourse: `Course ${i + 1}`,
    Totaldays: Math.floor(Math.random() * 10),
    timeofcourse: "10:00 AM",
    present: Math.floor(Math.random() * 10),
    absent: Math.floor(Math.random() * 10),
    cancelled: Math.floor(Math.random() * 10),
    criteria: Math.floor(Math.random() * 100),
    thatday: ["Monday", "Tuesday", "Thursday"],
  }));
  return (
    <div className="w-full px-3 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center ">
      {demoList.map((item) => (
        <SingleCardDisplay
          key={item.IndivCourse}
          course={item}
          fromWhichList={"true"}
        />
      ))}
    </div>
  );
};

export default Page;
