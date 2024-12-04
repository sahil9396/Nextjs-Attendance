import React from "react";
import NavigationButtons from "../NavigationButtons";
import { ModeToggle } from "../../../ui/theme-toggle";
import MiddlePartDemo from "./MiddlePartDemo";

const SideBarDemo = () => {
  const demoList = [
    {
      title: "Dashboard",
      href: "/demo/home",
    },
    {
      title: "Today",
      href: "/demo/today-mark-status",
    },
    {
      title: "Logs",
      href: "/demo/list-course",
    },
    {
      title: "Settings",
      href: "/demo/setting-page",
    },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-between lg:justify-between items-center gap-5 py-2">
      <NavigationButtons menuOptions={demoList} />
      <div className="h-full w-10/12 hidden lg:flex flex-col gap-2">
        <MiddlePartDemo />
      </div>
      <div className="hidden lg:flex flex-col items-center gap-2 w-4/5 ">
        <ModeToggle />
      </div>
    </div>
  );
};

export default SideBarDemo;
