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

const helper = async (
  state: contextype,
  dispatch: Dispatch<ActionType>,
  semFromUrl: string | null,
  router: any
) => {
  if (state.user.clerk_id !== "") return;

  dispatch({
    type: "SET_IS_LOADING",
    payload: true,
  });

  const userInfo = await getUserInfo();
  if (!userInfo) {
    dispatch({
      type: "SET_IS_LOADING",
      payload: false,
    });
    return;
  }

  const semList: SingleSemester[] = await getSemesterList(userInfo);

  if (!semList?.length) {
    dispatch({
      type: "SET_IS_LOADING",
      payload: false,
    });
    return;
  }

  if (!semFromUrl) {
    router.push(`?semester=${semList[0].semester}`);
  }

  const semExist = semList.find(
    (sem: SingleSemester) => sem.semester === semFromUrl
  );

  const list: inputData[][] | null = await getList(
    semExist?.semester || semList[0].semester,
    userInfo
  );

  if (!list) {
    dispatch({
      type: "SET_IS_LOADING",
      payload: false,
    });
    return;
  }

  const existsList = list[0]?.length && list[1]?.length;

  if (!existsList) {
    dispatch({
      type: "SET_ZERO_COURSES",
      payload: true,
    });
    return;
  }

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
    helper(state, dispatch, semFromUrl, router);
  }, []);
};
