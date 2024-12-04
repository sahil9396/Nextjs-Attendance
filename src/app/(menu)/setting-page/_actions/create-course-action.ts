"use server";

import db from "@/lib/db";
import { inputData, SingleSemester, userDetailstype } from "@/lib/type";
import { revalidateTag } from "next/cache";

export const createCourse = async (
  userDetails: userDetailstype,
  inputData: inputData,
  day: string[],
  singleSemester: SingleSemester
) => {
  const datacreated = day.map((val: string) => ({
    assignedBy: userDetails.user_name,
    assignedAt: new Date(),
    day: {
      connectOrCreate: {
        where: { day: val },
        create: { day: val },
      },
    },
  }));

  try {
    const courseExists = await db.course.findFirst({
      where: {
        IndivCourse: inputData.IndivCourse,
        semesterDetails: {
          id: singleSemester.id,
          semester: singleSemester.semester,
          userDetails: {
            email_address: userDetails.email_address,
            phone_number: userDetails.phone_number,
            verified: userDetails.verified,
            clerk_id: userDetails.clerk_id,
            user_name: userDetails.user_name,
          },
        },
      },
    });

    if (courseExists) {
      return "course Already exists!!!";
    }
    await db.course.create({
      data: {
        IndivCourse: inputData.IndivCourse,
        timeofcourse: `${inputData.timeofcourse}`,
        Totaldays: inputData.totaldays || 35,
        present: inputData.present || 0,
        absent: inputData.absent || 0,
        cancelled: inputData.cancelled || 0,
        criteria: Number(inputData.criteria) || 75,
        semesterDetails: {
          connectOrCreate: {
            where: {
              id: singleSemester.id,
              semester: singleSemester.semester,
              userDetails: {
                email_address: userDetails.email_address,
                phone_number: userDetails.phone_number,
                verified: userDetails.verified,
                clerk_id: userDetails.clerk_id,
                user_name: userDetails.user_name,
              },
            },
            create: {
              semester: singleSemester.semester,
              userDetails: {
                connectOrCreate: {
                  where: {
                    email_address: userDetails.email_address,
                    phone_number: userDetails.phone_number,
                    verified: userDetails.verified,
                    clerk_id: userDetails.clerk_id,
                    user_name: userDetails.user_name,
                  },
                  create: {
                    email_address: userDetails.email_address,
                    phone_number: userDetails.phone_number,
                    name: userDetails.first_name,
                    user_name: userDetails.user_name,
                    verified: userDetails.verified,
                    clerk_id: userDetails.clerk_id,
                    image:
                      userDetails.image_url || userDetails.profile_image_url,
                  },
                },
              },
            },
          },
        },
        thatday: { create: datacreated },
      },
    });
    revalidateTag("getList");
    return `course is created !!!`;
  } catch (error) {
    console.error(error);
    return "Some things went wrong!!!";
  }
};
