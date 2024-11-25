import { UserButton } from "@clerk/nextjs";
import React from "react";
import SearchBar from "./app-bar/Searchbar";
import MobileSideBar from "./app-bar/MobileSideBar";

const Appbar = () => {
  return (
    <div className="w-full h-full px-3 flex justify-between lg:justify-end items-center">
      <MobileSideBar />
      <div className="w-full h-full flex flex-row-reverse justify-between items-center">
        <SearchBar />
        <span className="hidden lg:flex justify-center gap-3 items-center">
          <UserButton />
        </span>
      </div>
    </div>
  );
};

export default Appbar;
