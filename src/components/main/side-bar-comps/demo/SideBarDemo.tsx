import React from "react";
import NavigationButtons from "../NavigationButtons";
import { ModeToggle } from "../../../ui/theme-toggle";
import MiddlePartDemo from "./MiddlePartDemo";

const SideBarDemo = () => {
  const demoList = [
    {
      title: "Home",
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
    <div className="w-full h-full flex flex-col justify-between lg:justify-between items-center gap-5 p-2">
      <NavigationButtons menuOptions={demoList} />
      <div className="h-full w-full hidden lg:flex flex-col gap-2">
        <MiddlePartDemo />
      </div>
      <div className="hidden lg:flex flex-col items-center gap-2 w-4/5 ">
        <ModeToggle />
      </div>
    </div>
  );
};

export default SideBarDemo;
