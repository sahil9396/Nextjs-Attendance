"use server";
import db from "@/lib/db";
import { inputData, inputTypeFromBackend, userDetailstype } from "@/lib/type";
import { custom_cache, todayCourseDecider, weekDays } from "@/lib/utils";

export const getTodaysList = custom_cache(
  async (currentSem: string, userInfo: userDetailstype) => {
    const { email_address, phone_number, verified, clerk_id, user_name } =
      userInfo;

    try {
      const semesterData: inputTypeFromBackend[] = await db.course.findMany({
        where: {
          semesterDetails: {
            semester: currentSem,
            userDetails: {
              email_address,
              phone_number,
              verified,
              clerk_id,
              user_name,
            },
          },
          thatday: {
            some: {
              day: {
                day: weekDays[todayCourseDecider],
              },
            },
          },
        },
        include: {
          thatday: {
            include: {
              day: true,
            },
          },
          semesterDetails: {
            select: {
              semester: true,
              id: true,
            },
          },
        },
      });

      const structuredData: inputData[] = semesterData.map(
        (item: inputTypeFromBackend) => ({
          ...item,
          thatday: item.thatday.map((item) => item.day.day),
        })
      );

      return structuredData;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  [],
  { tags: ["getTodaysList"] }
);
