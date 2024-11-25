import React from "react";
import SemSelector from "./sem-change-options/sem-selector";
import CreateSemester from "./mutate-sem/create-sem";
import DeleteSemester from "./mutate-sem/delete-sem";
import MutateCourses from "./mutate-course";

const SemChange = async () => {
  return (
    <div>
      <SemSelector />
      <div className="flex flex-col py-3 lg:flex-row gap-2 lg:gap-4 w-full">
        <CreateSemester />
        <DeleteSemester />
      </div>
      <MutateCourses />
    </div>
  );
};

export default SemChange;
