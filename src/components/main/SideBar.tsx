import React from "react";
import NavigationButtons from "./side-bar-comps/NavigationButtons";
import { ModeToggle } from "../ui/theme-toggle";
import MiddlePart from "./middlePart";
import CalendarButton from "./calendar-button";

const SideBar = async () => {
  return (
    <div className="w-full h-full flex flex-col justify-between lg:justify-between items-center gap-5 py-2">
      <NavigationButtons />
      <div className="h-full w-10/12 hidden lg:flex flex-col gap-2">
        <MiddlePart />
      </div>
      <div className="hidden lg:flex flex-col items-center gap-2 w-10/12 ">
        <CalendarButton />
        <ModeToggle />
      </div>
    </div>
  );
};

export default SideBar;
