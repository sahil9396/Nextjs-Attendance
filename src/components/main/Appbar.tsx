import { UserButton } from "@clerk/nextjs";
import React from "react";

const Appbar = () => {
  return (
    <div className="hidden h-full lg:flex justify-between gap-3 items-center">
      <UserButton />
    </div>
  );
};

export default Appbar;
