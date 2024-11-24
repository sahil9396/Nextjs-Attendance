import React from "react";
import SemSelector from "./sem-change-options/sem-selector";
import { getSemesterList, getUserInfo } from "@/lib/all-server";
import NoCourses from "@/components/main/NoCourses";
import CreateSemester from "./mutate-sem/create-sem";
import DeleteSemester from "./mutate-sem/delete-sem";
import { userDetailstype } from "@/lib/type";

const SemChange = async ({
  currentSemester,
  user,
}: {
  currentSemester: string | undefined;
  user: userDetailstype;
}) => {
  
  const semList = await getSemesterList(user);
  if (!semList) return <NoCourses />;

  return (
    <div>
      <SemSelector
        currentSemester={currentSemester || semList[0].semester}
        semList={semList}
      />
      <div className="flex flex-col py-3 lg:flex-row gap-2 lg:gap-4 w-full">
        <CreateSemester semList={semList} />
        <DeleteSemester semList={semList} />
      </div>
    </div>
  );
};

export default SemChange;
