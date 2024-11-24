"use client";
import { toast } from "sonner";
import { usePathname, useSearchParams } from "next/navigation";
import CustomButton from "@/components/global/custom-button";
import UpdaterDialog from "./updater-dialgo";
import { useDataContext } from "@/providers/data-provider";

const returnSomeCourse = (
  list: any[],
  selected: string,
  printstatement: string
) => {
  console.log(printstatement);
  return list.find((course) => course.IndivCourse === selected);
};

const SingleCardUpdatar = () => {
  const pathName = usePathname().split("/").pop();
  const { state, dispatch } = useDataContext();
  const searchParm = useSearchParams();
  const selected = searchParm.get("selected");
  if (
    pathName !== "list-course" ||
    state.todayCourses.length === 0 ||
    !selected
  ) {
    return null;
  }

  console.clear();
  const value =
    returnSomeCourse(state.todayCourses, selected , "today") ||
    returnSomeCourse(state.notToday, selected,"nottoday");
  console.log(value);

  return (
    <div className="w-full bg-transparent text-white flex flex-col ">
      <div className="h-full flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <CustomButton
            size={"sm"}
            className="bg-red-600 hover:bg-red-700 w-full text-white dark:bg-red-500 dark:hover:bg-red-400"
            // onClick={handleDelete}
            // disabled={selectedCourse.IndivCourse === "" || isBackendProcessing}
            content="Delete"
          />
          <UpdaterDialog courseName={selected} />
        </div>
      </div>
    </div>
  );
};

export default SingleCardUpdatar;
