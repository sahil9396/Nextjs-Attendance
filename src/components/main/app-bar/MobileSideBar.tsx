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
      <main
        className={`w-screen h-screen fixed inset-0 z-[45] flex flex-col justify-between bg-white dark:bg-gradient-to-b dark:from-black dark:to-gray-800 md:hidden transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="w-full flex flex-row items-center justify-between py-4 px-6 border-b border-gray-700">
          <MenuCloseButton isOpen={isOpen} toggleSidebar={toggleSidebar} />
          {demo ? null : <UserButton />}
        </header>

        <section className=" h-full w-full flex flex-col justify-start items-center gap-2 p-2">
          <Link
            className="w-full md:hidden p-2 border border-gray-500 rounded-lg dark:bg-black text-center"
            href={"/"}
          >
            Landing Page
          </Link>
          {demo ? <MiddlePartDemo /> : <MiddlePart />}
        </section>

        <footer className="flex flex-col gap-2 p-2">
          <CalendarButton />
          {/* bg-black dark:bg-white dark:text-black text-white rounded-md */}
          <div className="w-full border border-gray-500 rounded-lg dark:bg-black">
            <ModeToggle />
          </div>
        </footer>
      </main>
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
      className="md:hidden p-2 bg-black dark:bg-slate-600 dark:bg-opacity-50 text-white rounded"
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
