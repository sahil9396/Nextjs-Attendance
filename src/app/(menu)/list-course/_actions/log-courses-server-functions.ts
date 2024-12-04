"use server";
import db from "@/lib/db";
import {
  eventType,
  inputData,
  inputTypeFromBackend,
  SingleSemester,
  userDetailstype,
} from "@/lib/type";
import { custom_cache } from "@/lib/utils";
import {
  color_id,
  getDate,
  todayCourseDecider,
  weekDays,
} from "@/lib/constants";
import { revalidateTag } from "next/cache";
import { createCalender } from "@/lib/all-server";

export const getList = custom_cache(
  async (currentSem: SingleSemester, userInfo: userDetailstype) => {
    const { email_address, phone_number, verified, clerk_id, user_name } =
      userInfo;

    try {
      const semesterData: inputTypeFromBackend[] | null =
        await db.course.findMany({
          where: {
            semesterDetails: {
              semester: currentSem.semester,
              id: currentSem.id,
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

      console.log("Tried to hit here");

      if (!semesterData || !semesterData?.length) return null;

      const structuredData: inputData[] = semesterData.map(
        (item: inputTypeFromBackend) => ({
          ...item,
          thatday: item.thatday.map((item) => item.day.day),
        })
      );

      const todayCourse: inputData[] = [];
      const notTodayCourse: inputData[] = [];

      structuredData.forEach((sem: inputData) => {
        const trueDay: boolean = sem.thatday.includes(
          Object.keys(weekDays)[todayCourseDecider]
        );
        if (trueDay) todayCourse.push(sem);
        else notTodayCourse.push(sem);
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
  currentSem: SingleSemester,
  userInfo: userDetailstype,
  data: inputData,
  daysChanged: boolean
) => {
  const {
    email_address,
    phone_number,
    verified,
    clerk_id,
    user_name,
    image_url,
    profile_image_url,
  } = userInfo;

  if (daysChanged) {
    try {
      const datacreated = data.thatday.map((val: string) => ({
        assignedBy: userInfo.user_name,
        assignedAt: new Date(),
        day: {
          connectOrCreate: {
            where: { day: val },
            create: { day: val },
          },
        },
      }));
      const deleteDays = db.day_Course.deleteMany({
        where: {
          course: {
            IndivCourse: data.IndivCourse,
          },
          assignedBy: userInfo.user_name,
        },
      });
      const deleteThatCourse = db.course.deleteMany({
        where: {
          IndivCourse: data.IndivCourse,
          semesterDetails: {
            semester: currentSem.semester,
            id: currentSem.id,
            userDetails: {
              email_address,
              phone_number,
              verified,
              clerk_id,
            },
          },
        },
      });
      const createdData = db.course.create({
        data: {
          IndivCourse: data.IndivCourse,
          timeofcourse: data.timeofcourse,
          present: Number(data.present) || 0,
          absent: Number(data.absent) || 0,
          cancelled: Number(data.cancelled) || 0,
          Totaldays: Number(data.TotalDays) || 35,
          criteria: Number(data.criteria) || 75,
          semesterDetails: {
            connectOrCreate: {
              where: {
                semester: currentSem.semester,
                id: currentSem.id,
                userDetails: {
                  email_address,
                  phone_number,
                  verified,
                  clerk_id,
                  user_name,
                },
              },
              create: {
                semester: currentSem.semester,
                userDetails: {
                  connectOrCreate: {
                    where: {
                      email_address,
                      phone_number,
                      verified,
                      clerk_id,
                      user_name,
                    },
                    create: {
                      email_address,
                      phone_number,
                      name: userInfo.first_name,
                      user_name,
                      verified,
                      clerk_id,
                      image: image_url || profile_image_url,
                    },
                  },
                },
              },
            },
          },
          thatday: { create: datacreated },
        },
      });
      await db.$transaction([deleteDays, deleteThatCourse, createdData]);
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    try {
      await db.course.updateMany({
        where: {
          semesterDetails: {
            semester: currentSem.semester,
            id: currentSem.id,
            userDetails: {
              email_address,
              phone_number,
              verified,
              clerk_id,
              user_name,
            },
          },
          IndivCourse: data.IndivCourse,
        },
        data: {
          present: Number(data.present) || 0,
          absent: Number(data.absent) || 0,
          cancelled: Number(data.cancelled) || 0,
          Totaldays: Number(data.TotalDays) || 35,
          criteria: Number(data.criteria) || 75,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  revalidateTag("getList");
};

export const deleteCourse = async (
  currentSem: SingleSemester,
  userInfo: userDetailstype,
  IndivCourse: string
) => {
  const { email_address, phone_number, verified, clerk_id, user_name } =
    userInfo;

  try {
    const deleteDays = db.day_Course.deleteMany({
      where: {
        course: {
          IndivCourse,
        },
        assignedBy: user_name,
      },
    });
    const deleteThatCourse = db.course.deleteMany({
      where: {
        IndivCourse,
        semesterDetails: {
          semester: currentSem.semester,
          id: currentSem.id,
          userDetails: {
            email_address,
            phone_number,
            verified,
            clerk_id,
          },
        },
      },
    });
    const allover = await db.$transaction([deleteDays, deleteThatCourse]);
    revalidateTag("getList");
    return allover;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateAllCourses = async (
  currentSem: SingleSemester,
  userInfo: userDetailstype,
  status: string,
  courses: {
    courseName: string;
    status: string;
    prev: number;
    pre: number;
    ab: number;
    can: number;
  }[]
) => {
  const { email_address, phone_number, verified, clerk_id, user_name } =
    userInfo;

  const currentTime = getDate();

  const eventDescription = courses
    .map(
      (course) =>
        `${course.courseName} ( p : ${course.pre + 1} , a : ${
          course.ab + 1
        } , c : ${course.can + 1})`
    )
    .join(", ");

  const event: eventType = {
    summary: `${
      courses[0].status === "present"
        ? `You have attended all Classes!!!`
        : `Today's all Classes are : ${courses[0].status} ${currentSem.semester}`
    }`,
    description: ` ${eventDescription}`,
    start: {
      dateTime: `${currentTime}T${"00:00"}:00+05:30`,
      timeZone: "IST",
    },
    end: {
      dateTime: `${currentTime}T${"17:00"}:00+05:30`,
      timeZone: "IST",
    },
    colorId: color_id[courses[0].status],
  };

  try {
    const calendarResponse = await createCalender(event);
    if (calendarResponse === "Failed") return calendarResponse;
    await db.course.updateMany({
      where: {
        semesterDetails: {
          semester: currentSem.semester,
          id: currentSem.id,
          userDetails: {
            email_address,
            phone_number,
            verified,
            clerk_id,
            user_name,
          },
        },
      },
      data: {
        [status]: {
          increment: 1,
        },
      },
    });
    revalidateTag("getList");
    return "Changes Done !!!";
  } catch (error) {
    console.error(error);
    return null;
  }
};
