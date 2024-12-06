"use client";
import React from "react";
import NavButtons from "./NavButtons";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  menuOptions: {
    title: string;
    href: string;
  }[];
};

const NavigationButtons = ({ menuOptions }: Props) => {
  const currentPath = usePathname();
  const searchParm = useSearchParams();
  const extractedSem = searchParm.get("semester");
  const selected = searchParm.get("selected");
  const today = searchParm.get("today");
  
  return (
    <div className="w-full flex flex-row lg:flex-col justify-evenly lg:justify-start items-center gap-2 lg:gap-6 rounded-lg">
      {menuOptions.map((option) => (
        <NavButtons
          key={option.href}
          href={option.href}
          currentSemNumber={extractedSem}
          currentPath={currentPath}
          passHref
          selected={selected}
          today={today}
        >
          {option.title}
        </NavButtons>
      ))}
    </div>
  );
};

export default NavigationButtons;
