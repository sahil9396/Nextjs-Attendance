import { UserButton } from "@clerk/nextjs";
import React from "react";
import SearchBar from "./app-bar/Searchbar";
import MobileSideBar from "./app-bar/MobileSideBar";

type Props = {
  demo?: boolean;
};

const Appbar = ({ demo }: Props) => {
  return (
    <div className="w-full h-16 sticky top-0 bg-white dark:bg-black z-[50]  px-3 md:px-9 flex justify-between lg:justify-end items-center border-b">
      <MobileSideBar demo={demo} />
      <div className="w-full h-full flex flex-row-reverse justify-between items-center">
        <SearchBar demo={demo} />
        <span className="hidden md:flex justify-center gap-3 items-center">
          {demo ? null : <UserButton />}
        </span>
      </div>
    </div>
  );
};

export default Appbar;
