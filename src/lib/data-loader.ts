"use client";
import {
  ActionType,
  contextype,
  SingleSemester,
  useDataContext,
} from "@/providers/data-provider";
import { getSemesterList, getUserInfo } from "./all-server";
import { getList } from "@/app/(menu)/list-course/_actions/log-courses-server-functions";
import { Dispatch, useEffect } from "react";
import { inputData } from "./type";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const helper = async (
  state: contextype,
  dispatch: Dispatch<ActionType>,
  semFromUrl: string | null,
  router: AppRouterInstance
) => {
  if (state.user.clerk_id !== "") return;

  const userInfo = await getUserInfo();
  if (!userInfo) {
    dispatch({
      type: "SET_IS_LOADING",
      payload: false,
    });
    return;
  }
  dispatch({
    type: "SET_USER",
    payload: userInfo,
  });
  console.log(userInfo);

  const semList: SingleSemester[] | null = await getSemesterList(userInfo);

  if (!semList?.length) {
    dispatch({
      type: "SET_IS_LOADING",
      payload: false,
    });
    return;
  }

  dispatch({
    type: "SET_SEMESTER_INFO",
    payload: semList,
  });

  const semExist = semList.find(
    (sem: SingleSemester) => sem.semester === semFromUrl
  );

  console.log(semList, semFromUrl);
  if (!semExist) router.push(`?semester=${semList[0].semester}`);
  console.log(semExist);

  const list: inputData[][] | null = await getList(
    semExist?.semester || semList[0].semester,
    userInfo
  );

  console.log(list);

  if (!list) {
    dispatch({
      type: "SET_IS_LOADING",
      payload: false,
    });
    return;
  }

  dispatch({
    type: "SET_IS_LOADING",
    payload: false,
  });

  dispatch({
    type: "SET_TODAY_AND_NOT_TODAY_COURSES",
    payload: {
      today: list[0],
      notToday: list[1],
    },
  });
};

export const useDataLoader = (semFromUrl: string | null) => {
  const { state, dispatch } = useDataContext();
  const router = useRouter();
  useEffect(() => {
    console.log("useDataLoader");
    helper(state, dispatch, semFromUrl, router);
  }, []);
};
