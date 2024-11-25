"use server";
import db from "@/lib/db";
import { userDetailstype } from "@/lib/type";
import { SingleSemester } from "@/providers/data-provider";
import { revalidateTag } from "next/cache";

// creating new semester
export const createSemester = async (
  userDetails: userDetailstype,
  semesterNumber: number
) => {
  const { email_address, phone_number, verified, clerk_id, user_name } =
    userDetails;
  try {
    const semesterExists = await db.semester.findFirst({
      where: {
        semester: `semester-${semesterNumber}`,
        userDetails: {
          email_address,
          phone_number,
          verified,
          clerk_id,
          user_name,
        },
      },
    });

    if (semesterExists) {
      console.log(semesterExists);
      return "Semester Already exists!!!";
    }

    const semester = await db.semester.create({
      data: {
        semester: `semester-${semesterNumber}`,
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
              verified,
              clerk_id,
              user_name,
            },
          },
        },
      },
    });

    revalidateTag("getSemesterList");
    return semester;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Deleting the semester
export const deleteSemester = async (
  userDetails: userDetailstype,
  semesterInfo: SingleSemester
) => {
  const { email_address, phone_number, verified, clerk_id, user_name } =
    userDetails;

  try {
    const deletedDayCourse = db.day_Course.deleteMany({
      where: {
        assignedBy: user_name,
        course: {
          semesterDetails: {
            semester: semesterInfo.semester,
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

    const deletedSemester = db.semester.deleteMany({
      where: {
        semester: semesterInfo.semester,
        userDetails: {
          email_address,
          phone_number,
          verified,
          clerk_id,
          user_name,
        },
      },
    });

    const result = await db.$transaction([
      deletedDayCourse,
      deletedCourse,
      deletedSemester,
    ]);

    revalidateTag("getSemesterList");
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
