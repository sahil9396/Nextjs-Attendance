"use client";
import React from "react";
import NavButtons from "./NavButtons";
import { usePathname, useSearchParams } from "next/navigation";

const NavigationButtons = () => {
  const currentPath = usePathname();
  const searchParm = useSearchParams();
  const extractedSem = searchParm.get("semester");
  const selected = searchParm.get("selected");
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
    <div className="w-full flex flex-row lg:flex-col justify-evenly lg:justify-start items-center gap-12 lg:gap-6 px-4 rounded-lg ">
      {menuOptions.map((option, index) => (
        <NavButtons
          key={index}
          href={option.href}
          currentSemNumber={extractedSem}
          currentPath={currentPath}
          passHref
          selected={selected}
        >
          {option.title}
        </NavButtons>
      ))}
    </div>
  );
};

export default NavigationButtons;
