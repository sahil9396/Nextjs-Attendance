import React from "react";
import NavigationButtons from "./side-bar-comps/NavigationButtons";
import MiddlePart from "./middlePart";
import { ModeToggle } from "../ui/theme-toggle";
import CalendarButton from "./calendar-button";

const SideBar = async () => {
  const menuOptions = [
    {
      title: "Today",
      href: "/today-mark-status",
    },
    {
      title: "Logs",
      href: "/list-course",
    },
    {
      title: "Settings",
      href: "/setting-page",
    },
  ];
  return (
    <div className="w-10/12 h-full flex flex-col justify-between lg:justify-between items-center gap-5 py-2">
      <NavigationButtons menuOptions={menuOptions} />
      <div className="h-full w-full hidden lg:flex flex-col gap-2">
        <MiddlePart />
      </div>
      <div className="hidden lg:flex flex-col items-center gap-2 w-4/5 ">
        <CalendarButton />
        <ModeToggle />
      </div>
    </div>
  );
};

export default SideBar;
