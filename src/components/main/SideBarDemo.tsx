"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBarDemo = () => {
  const pathName = usePathname();
  console.log(pathName);
  const demoList = [
    {
      title: "today-mark-status",
      link: "/demo/today-mark-status",
    },
    {
      title: "list-course",
      link: "/demo/list-course",
    },
    {
      title: "setting",
      link: "/demo/setting-page",
    },
  ];
  return (
    <div className="h-full w-full flex flex-col gap-5 justify-start items-center">
      {demoList.map((item) => (
        <Link
          href={item.link}
          key={item.title}
          className={`w-full text-center text-slate-400 dark:text-white cursor-pointer  p-1 rounded-lg
            ${pathName === item.link ? "bg-slate-400" : "bg-slate-900"}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default SideBarDemo;
