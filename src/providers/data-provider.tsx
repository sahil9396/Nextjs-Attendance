"use client";
import {
  inputData,
  SingleSemester,
  todayStatusDoneType,
  userDetailstype,
} from "@/lib/type";
import { createContext, Dispatch, useContext, useReducer } from "react";

export interface contextype {
  zeroCourses: boolean;
  setZeroCourses: (value: boolean) => void;
  semesterInfo: SingleSemester[];
  setSemesterInfo: (value: SingleSemester[]) => void;
  todayCourses: inputData[];
  setTodayCourses: (value: inputData[]) => void;
  notToday: inputData[];
  setNotToday: (value: inputData[]) => void;
  todayStatusDone: todayStatusDoneType;
  setTodayStatusDone: (value: todayStatusDoneType) => void;
  searchParam: string;
  setSearchParam: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isBackendProcessing: boolean;
  setIsBackendProcessing: (value: boolean) => void;
  user: userDetailstype;
  setUser: (value: userDetailstype) => void;
}

export const initialUserInfo: userDetailstype = {
  email_address: "",
  phone_number: "",
  first_name: "",
  user_name: "",
  image_url: "",
  profile_image_url: "",
  verified: false,
  clerk_id: "",
};

export const initialTodayStatusDone: todayStatusDoneType = {
  date: "",
  courseNames: [],
};

export const initialSemesterInfo: SingleSemester[] = [];

type props = {
  children: React.ReactNode;
};

export type ActionType =
  | { type: "SET_ZERO_COURSES"; payload: boolean }
  | { type: "SET_SEMESTER_INFO"; payload: SingleSemester[] }
  | { type: "SET_NOT_TODAY"; payload: inputData[] }
  | { type: "SET_TODAY_COURSES"; payload: inputData[] }
  | {
      type: "SET_TODAY_AND_NOT_TODAY_COURSES";
      payload: {
        today: inputData[];
        notToday: inputData[];
      };
    }
  | { type: "SET_TODAY_STATUS_DONE"; payload: todayStatusDoneType }
  | { type: "SET_SEARCH_PARAM"; payload: string }
  | { type: "SET_IS_LOADING"; payload: boolean }
  | { type: "SET_IS_BACKEND_PROCESSING"; payload: boolean }
  | { type: "SET_USER"; payload: userDetailstype };

const initialState: contextype = {
  user: initialUserInfo,
  setUser: () => {},
  semesterInfo: initialSemesterInfo,
  setSemesterInfo: () => {},
  zeroCourses: false,
  setZeroCourses: () => {},
  notToday: [],
  setNotToday: () => {},
  todayCourses: [],
  setTodayCourses: () => {},
  todayStatusDone: initialTodayStatusDone,
  setTodayStatusDone: () => {},
  searchParam: "",
  setSearchParam: () => {},
  isLoading: true,
  setIsLoading: () => {},
  isBackendProcessing: false,
  setIsBackendProcessing: () => {},
};

type reducerTypes = { state: contextype; dispatch: Dispatch<ActionType> };

const reducerType: reducerTypes = {
  state: initialState,
  dispatch: () => console.log("hji"),
};

export const contextdata = createContext(reducerType);

function reducer(state: contextype, action: ActionType): contextype {
  switch (action.type) {
    case "SET_ZERO_COURSES":
      return { ...state, zeroCourses: action.payload, isLoading: false };
    case "SET_SEMESTER_INFO":
      return { ...state, semesterInfo: action.payload };
    case "SET_NOT_TODAY":
      return { ...state, notToday: action.payload };
    case "SET_TODAY_COURSES":
      return { ...state, todayCourses: action.payload };
    case "SET_TODAY_AND_NOT_TODAY_COURSES":
      return {
        ...state,
        todayCourses: action.payload.today,
        notToday: action.payload.notToday,
        isLoading: false,
      };
    case "SET_TODAY_STATUS_DONE":
      return { ...state, todayStatusDone: action.payload };
    case "SET_SEARCH_PARAM":
      return { ...state, searchParam: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_IS_BACKEND_PROCESSING":
      return { ...state, isBackendProcessing: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export const Context_Pro_Provider = ({ children }: props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <contextdata.Provider value={value}>{children}</contextdata.Provider>;
};

export function useDataContext() {
  const context = useContext(contextdata);
  if (!context) {
    throw new Error(
      "useDataContext must be used within a Context_Pro_Provider"
    );
  }
  return context;
}
