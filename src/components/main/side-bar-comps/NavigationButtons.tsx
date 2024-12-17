"use client";
import React from "react";
import NavButtons from "./NavButtons";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  menuOptions: {
    title: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
};

const NavigationButtons = ({ menuOptions }: Props) => {
  const currentPath = usePathname();
  const searchParm = useSearchParams();
  const extractedSem = searchParm.get("semester");
  const selected = searchParm.get("selected");
  const today = searchParm.get("today");

  return (
    <div className="w-full flex flex-row md:flex-col justify-evenly md:justify-start items-center gap-2 md:gap-6 rounded-lg">
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
          <option.icon className="h-4 w-4" />
          <span className="lg:inline-block hidden">{option.title}</span>
        </NavButtons>
      ))}
    </div>
  );
};

export default NavigationButtons;
