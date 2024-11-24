"use server";
import db from "@/lib/db";
import { inputData, inputTypeFromBackend, userDetailstype } from "@/lib/type";
import { custom_cache} from "@/lib/utils";
import { todayCourseDecider, weekDays } from "@/lib/constants";
import { revalidatePath, revalidateTag } from "next/cache";

export const getList = custom_cache(
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

      // const filteredDataAccordingToDate =
      const todayCourse: inputData[] = [];
      const notTodayCourse: inputData[] = [];

      structuredData.forEach((sem: inputData) => {
        const trueDay: boolean = sem.thatday.includes(
          weekDays[todayCourseDecider]
        );
        trueDay ? todayCourse.push(sem) : notTodayCourse.push(sem);
      });
      return [todayCourse, notTodayCourse];
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  [],
  { tags: ["getList"] }
);


export const updateList = async (
  currentSem: string,
  userInfo: userDetailstype,
  data: inputData[]
) => {
  // revalidateTag("getList");
  const { email_address, phone_number, verified, clerk_id, user_name } =
    userInfo;

  try {
    const semesterData = await db.course.findMany({
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
};
