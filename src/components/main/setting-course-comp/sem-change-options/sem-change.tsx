import React from "react";
import SemSelector from "./sem-selector";
import CreateSemester from "../mutate-sem/create-sem";
import DeleteSemester from "../mutate-sem/delete-sem";

const SemChange = () => {
  return (
    <div>
      <SemSelector />
      <div className="flex flex-col py-3 lg:flex-row gap-2 lg:gap-4 w-full">
        <CreateSemester />
        <DeleteSemester />
      </div>
    </div>
  );
};

export default SemChange;
