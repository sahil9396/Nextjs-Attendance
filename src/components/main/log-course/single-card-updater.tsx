"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useDataContext } from "@/providers/data-provider";
import CourseDelete from "./course-delete";
import UpdaterDialog from "./updater-dialgo";

const SingleCardUpdater = () => {
  const pathName = usePathname().split("/").pop();
  const searchParam = useSearchParams();
  const { state, dispatch } = useDataContext();

  const selected = searchParam.get("selected");
  const today: string | null = searchParam.get("today");

  if (
    pathName !== "list-course" ||
    !selected ||
    state.todayCourses.concat(state.notToday).length === 0
  ) {
    return null;
  }

  return (
    <div className="w-full bg-transparent text-white flex flex-col">
      <div className="h-full flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <CourseDelete
            state={state}
            dispatch={dispatch}
            selected={selected}
            today={today}
          />
          <UpdaterDialog courseName={selected} today={today} />
        </div>
      </div>
    </div>
  );
};

export default SingleCardUpdater;
