"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import CalendarButton from "../calendar-button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import MiddlePart from "../middlePart";
import MiddlePartDemo from "../side-bar-comps/demo/MiddlePartDemo";
import Link from "next/link";

type Props = {
  demo?: boolean;
};

const MobileSideBar = ({ demo }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuCloseButton isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`fixed inset-0 z-[45] flex flex-col justify-center items-center lg:hidden transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-[radial-gradient(circle_at_57%_36%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_10%,_transparent_10%,_transparent_100%),_radial-gradient(circle_at_22%_61%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_36%,_transparent_36%,_transparent_100%),_radial-gradient(circle_at_68%_97%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_41%,_transparent_41%,_transparent_100%),_radial-gradient(circle_at_57%_89%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_30%,_transparent_30%,_transparent_100%),_radial-gradient(circle_at_39%_80%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_22%,_transparent_22%,_transparent_100%),_radial-gradient(circle_at_88%_71%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_30%,_transparent_30%,_transparent_100%),_linear-gradient(0deg,_rgb(255,255,255),_rgb(255,255,255))] dark:bg-gradient-to-b dark:from-black dark:to-gray-800`}
      >
        <div className="w-full flex flex-row items-center justify-between py-4 px-6 border-b border-gray-700">
          <div className="flex items-center justify-center gap-5">
            <MenuCloseButton isOpen={isOpen} toggleSidebar={toggleSidebar} />
          </div>
          {demo ? null : <UserButton />}
        </div>
        <div className="w-10/12 flex flex-col py-4 justify-between items-center gap-3 h-full">
          <Link
            className="w-full lg:hidden p-2 bg-black dark:bg-white dark:text-black text-white text-center rounded-md"
            href={"/"}
          >
            Landing Page
          </Link>
          <nav className="w-full h-full flex flex-col justify-start items-center gap-2 ">
            {demo ? <MiddlePartDemo /> : <MiddlePart />}
          </nav>
          <nav className="w-full flex flex-col justify-start items-center gap-2 ">
            {demo ? null : <CalendarButton />}
            <span className="w-full bg-black dark:bg-white dark:text-black text-white rounded-md">
              <ModeToggle />
            </span>
          </nav>
        </div>
      </div>
    </>
  );
};

const MenuCloseButton = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <button
      onClick={toggleSidebar}
      className="lg:hidden p-2 bg-black dark:bg-slate-600 dark:bg-opacity-50 text-white rounded"
    >
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      )}
    </button>
  );
};

export default MobileSideBar;
