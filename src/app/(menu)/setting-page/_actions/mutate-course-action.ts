"use server";
import db from "@/lib/db";
import { SingleSemester, userDetailstype } from "@/lib/type";
import { revalidateTag } from "next/cache";

export const resetAllCard = async (
  userDetails: userDetailstype,
  semesterInfo: SingleSemester
) => {
  const { email_address, phone_number, verified, clerk_id, user_name } =
    userDetails;

  await db.course.updateMany({
    where: {
      semesterDetails: {
        semester: semesterInfo.semester,
        id: semesterInfo.id,
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
      present: 0,
      absent: 0,
      cancelled: 0,
      Totaldays: 35,
      criteria: 75,
    },
  });
  revalidateTag("getList");
  return "Changes Done !!!";
};

export const deleteAllCard = async (
  userDetails: userDetailstype,
  semesterInfo: SingleSemester
) => {
  const { email_address, phone_number, verified, clerk_id, user_name } =
    userDetails;
  const deletedDayCourse = db.day_Course.deleteMany({
    where: {
      assignedBy: user_name,
      course: {
        semesterDetails: {
          semester: semesterInfo.semester,
          id: semesterInfo.id,
          userDetails: {
            email_address,
            phone_number,
            verified,
            clerk_id,
            user_name,
          },
        },
      },
    },
  });

  const deletedCourse = db.course.deleteMany({
    where: {
      semesterDetails: {
        semester: semesterInfo.semester,
        id: semesterInfo.id,
        userDetails: {
          email_address,
          phone_number,
          verified,
          clerk_id,
          user_name,
        },
      },
    },
  });

  const result = await db.$transaction([deletedDayCourse, deletedCourse]);
  revalidateTag("getList");
  return result;
};
