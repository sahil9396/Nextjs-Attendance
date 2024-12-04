"use client";
import { weekDays } from "@/lib/constants";
import {
  inputData,
  SingleSemester,
  todayStatusDoneType,
  userDetailstype,
} from "@/lib/type";
import { createContext, Dispatch, useContext, useReducer } from "react";

export interface demoContextType {
  demoZeroCourses: boolean;
  setDemoZeroCourses: (value: boolean) => void;
  demoSemesterInfo: SingleSemester[];
  setDemoSemesterInfo: (value: SingleSemester[]) => void;
  demoTodayCourses: inputData[];
  setDemoTodayCourses: (value: inputData[]) => void;
  demoNotToday: inputData[];
  setDemoNotToday: (value: inputData[]) => void;
  demoTodayStatusDone: todayStatusDoneType;
  setDemoTodayStatusDone: (value: todayStatusDoneType) => void;
  demoSearchParam: string;
  setDemoSearchParam: (value: string) => void;
  demoIsBackendProcessing: boolean;
  setDemoIsBackendProcessing: (value: boolean) => void;
  demoUser: userDetailstype;
  setDemoUser: (value: userDetailstype) => void;
}

const initialDemoUserInfo: userDetailstype = {
  email_address: "demo@example.com",
  phone_number: "123-456-7890",
  first_name: "John",
  user_name: "johndoe",
  image_url: "https://example.com/image.jpg",
  profile_image_url: "https://example.com/profile.jpg",
  verified: true,
  clerk_id: "clerk123",
};

const initialDemoTodayStatusDone: todayStatusDoneType = {
  date: "",
  courseNames: [],
};

const initialDemoSemesterInfo: SingleSemester[] = Array.from({
  length: 5,
}).map((_, index) => ({
  id: index + 1,
  semester: `semester-${index + 1}`,
  userId: index,
}));

const weekDaysKeys = Object.keys(weekDays);

const randomDemoCourse = (length: number, bias: number) =>
  Array.from({
    length,
  }).map((_, index) => ({
    IndivCourse: `cours-${index + bias}`,
    Totaldays: 100,
    totaldays: 100,
    timeofcourse: "12:00 PM",
    present: 5,
    absent: 10,
    cancelled: 0,
    criteria: 100,
    thatday: Array.from({ length: 5 }).map((_, index) => weekDaysKeys[index]),
  }));

const initialDemoTodayCourses: inputData[] = randomDemoCourse(2, 1);

const initialDemoNotToday: inputData[] = randomDemoCourse(3, 7);

type demoProps = {
  children: React.ReactNode;
};

export type demoActionType =
  | { type: "SET_DEMO_ZERO_COURSES"; payload: boolean }
  | { type: "SET_DEMO_SEMESTER_INFO"; payload: SingleSemester[] }
  | { type: "SET_DEMO_NOT_TODAY"; payload: inputData[] }
  | { type: "SET_DEMO_TODAY_COURSES"; payload: inputData[] }
  | {
      type: "SET_DEMO_TODAY_AND_NOT_TODAY_COURSES";
      payload: {
        today: inputData[];
        notToday: inputData[];
      };
    }
  | { type: "SET_DEMO_TODAY_STATUS_DONE"; payload: todayStatusDoneType }
  | { type: "SET_DEMO_SEARCH_PARAM"; payload: string }
  | { type: "SET_DEMO_IS_LOADING"; payload: boolean }
  | { type: "SET_DEMO_IS_BACKEND_PROCESSING"; payload: boolean }
  | { type: "SET_DEMO_USER"; payload: userDetailstype };

const initialDemoState: demoContextType = {
  demoUser: initialDemoUserInfo,
  setDemoUser: () => {},
  demoSemesterInfo: initialDemoSemesterInfo,
  setDemoSemesterInfo: () => {},
  demoZeroCourses: false,
  setDemoZeroCourses: () => {},
  demoNotToday: initialDemoNotToday,
  setDemoNotToday: () => {},
  demoTodayCourses: initialDemoTodayCourses,
  setDemoTodayCourses: () => {},
  demoTodayStatusDone: initialDemoTodayStatusDone,
  setDemoTodayStatusDone: () => {},
  demoSearchParam: "",
  setDemoSearchParam: () => {},
  demoIsBackendProcessing: false,
  setDemoIsBackendProcessing: () => {},
};

type demoReducerTypes = {
  state: demoContextType;
  dispatch: Dispatch<demoActionType>;
};

const demoReducerType: demoReducerTypes = {
  state: initialDemoState,
  dispatch: () => console.log("hji"),
};

export const demoContextData = createContext(demoReducerType);

function demoReducer(
  state: demoContextType,
  action: demoActionType
): demoContextType {
  switch (action.type) {
    case "SET_DEMO_ZERO_COURSES":
      return {
        ...state,
        demoZeroCourses: action.payload,
      };
    case "SET_DEMO_SEMESTER_INFO":
      return { ...state, demoSemesterInfo: action.payload };
    case "SET_DEMO_NOT_TODAY":
      return { ...state, demoNotToday: action.payload };
    case "SET_DEMO_TODAY_COURSES":
      return { ...state, demoTodayCourses: action.payload };
    case "SET_DEMO_TODAY_AND_NOT_TODAY_COURSES":
      return {
        ...state,
        demoTodayCourses: action.payload.today,
        demoNotToday: action.payload.notToday,
      };
    case "SET_DEMO_TODAY_STATUS_DONE":
      return { ...state, demoTodayStatusDone: action.payload };
    case "SET_DEMO_SEARCH_PARAM":
      return { ...state, demoSearchParam: action.payload };
    case "SET_DEMO_IS_BACKEND_PROCESSING":
      return { ...state, demoIsBackendProcessing: action.payload };
    case "SET_DEMO_USER":
      return { ...state, demoUser: action.payload };
    default:
      return state;
  }
}

export const DemoContextProvider = ({ children }: demoProps) => {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);

  const value = { state, dispatch };

  return (
    <demoContextData.Provider value={value}>
      {children}
    </demoContextData.Provider>
  );
};

export function useDemoDataContext() {
  const context = useContext(demoContextData);
  if (!context) {
    throw new Error(
      "useDemoDataContext must be used within a DemoContextProvider"
    );
  }
  return context;
}
