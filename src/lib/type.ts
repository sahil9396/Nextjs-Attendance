import { z } from "zod";

export type formKeyType =
  | "indivCourse"
  | "criteria"
  | "totaldays"
  | "present"
  | "absent"
  | "cancelled";

export const formSchema = z.object({
  indivCourse: z.string().min(2).max(50),
  criteria: z.string().min(0).max(50),
  totaldays: z.string().min(0).max(50),
  present: z.string().min(0).max(50),
  absent: z.string().min(0).max(50),
  cancelled: z.string().min(0).max(50),
  startTime: z.string().min(0).max(50),
  endTime: z.string().min(0).max(50),
});

export type day = {
  Monday: string | boolean;
  Tuesday: string | boolean;
  Wednesday: string | boolean;
  Thursday: string | boolean;
  Friday: string | boolean;
} & { [key: string]: boolean | string };

export type eventType = {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  colorId: string;
};

export type colorIdType = {
  [key: string]: string;
};

export type thatdayType = {
  day: { id: number; day: string };
  assignedBy: string;
  assignedAt: Date;
  dayId: number;
  courseId: number;
};

export type inputTypeFromBackend = {
  IndivCourse: string;
  Totaldays: number;
  totaldays?: number;
  timeofcourse: string;
  present: number;
  absent: number;
  cancelled: number;
  criteria: number;
  thatday: thatdayType[];
};

export type inputData = {
  IndivCourse: string;
  Totaldays: number;
  totaldays?: number;
  timeofcourse: string;
  present: number;
  absent: number;
  cancelled: number;
  criteria: number;
  thatday: string[];
} & {
  [key: string]: number | string | string[];
};

export type userDetailstype = {
  email_address: string;
  first_name: string;
  user_name: string;
  image_url: string;
  profile_image_url: string;
  verified: boolean;
  clerk_id: string;
};

export type currentSemesterType = {
  currentSemester: SingleSemester | null | undefined;
};

export type todayStatusDoneType = {
  date: string;
  courseNames: string[];
};

export type SingleSemester = {
  id: number;
  semester: string;
  userId: number;
};

