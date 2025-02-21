"use client";
import {
  ActionType,
  contextype,
  useDataContext,
} from "@/providers/data-provider";
import { getSemesterList, getUserInfo } from "./all-server";
import { getList } from "@/lib/actions/log-courses-server-functions";
import { Dispatch, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const setLoading = (dispatch: Dispatch<ActionType>, isLoading: boolean) => {
  dispatch({ type: "SET_IS_LOADING", payload: isLoading });
};

const helper = async (
  state: contextype,
  dispatch: Dispatch<ActionType>,
  semFromUrl: string | null,
  router: AppRouterInstance
) => {
  if (state.user.clerk_id) return;

  try {
    const userInfo = await getUserInfo();
    if (!userInfo) {
      router.replace("/sign-up");
      return setLoading(dispatch, false);
    }

    dispatch({ type: "SET_USER", payload: userInfo });

    const semList = await getSemesterList(userInfo);
    if (!semList?.length) {
      localStorage.removeItem("semester");
      return setLoading(dispatch, false);
    }

    dispatch({ type: "SET_SEMESTER_INFO", payload: semList });

    const semExist = semList.find((sem) => sem.semester === semFromUrl);
    const list = await getList(semExist || semList[0], userInfo);

    // if (!semExist) {
    //   router.push(`?semester=${semList[0].semester}`, { scroll: false });
    // }
    router.push(`?semester=${semExist?.semester || semList[0].semester}`, {
      scroll: false,
    });
    if (!list) return setLoading(dispatch, false);

    dispatch({
      type: "SET_TODAY_AND_NOT_TODAY_COURSES",
      payload: { today: list[0], notToday: list[1] },
    });
  } catch (error) {
    console.error(error);
  }
  setLoading(dispatch, false);
};

export const useDataLoader = (semFromUrl: string | null) => {
  const { state, dispatch } = useDataContext();
  const router = useRouter();

  useEffect(() => {
    const loadSemester = async () => {
      const fromLocalStorageSemesterInfo = localStorage.getItem("semester");
      await helper(
        state,
        dispatch,
        semFromUrl ||
          (fromLocalStorageSemesterInfo &&
            JSON.parse(fromLocalStorageSemesterInfo)),
        router
      );
    };
    loadSemester();
  }, [semFromUrl]);
};
