"use server";
import db from "@/lib/db";
import { userDetailstype } from "@/lib/type";
import { revalidateTag } from "next/cache";
import { Prisma } from "@prisma/client/edge";

// creating new semester
export const createSemester = async (
  userDetails: userDetailstype,
  semesterNumber: number
) => {
  const { email_address, verified, clerk_id, user_name } = userDetails;
  try {
    const semesterExists = await db.semester.findFirst({
      where: {
        semester: `semester-${semesterNumber}`,
        userDetails: {
          email_address,
          verified,
          clerk_id,
          user_name,
        },
      },
    });

    if (semesterExists) {
      return "Semester Already exists!!!";
    }

    const semester = await db.semester.create({
      data: {
        semester: `semester-${semesterNumber}`,
        userDetails: {
          connectOrCreate: {
            where: {
              email_address,
              verified,
              clerk_id,
              user_name,
            },
            create: {
              email_address,
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
    // console.error(userDetails, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(
          "User does not exist. Please contact the administrator."
        );
      }

      if (error.code === "P2025") {
        throw new Error(
          "An operation failed because it depends on one or more records that were required but not found."
        );
      }
      if (error.code === "P2018") {
        throw new Error("The required connected records were not found.");
      }
    }
    throw error;
  }
};

// Deleting the semester
export const deleteSemester = async (
  userDetails: userDetailstype,
  semester: string
) => {
  const { email_address, verified, clerk_id, user_name } = userDetails;

  try {
    const deletedDayCourse = db.day_Course.deleteMany({
      where: {
        assignedBy: user_name,
        course: {
          semesterDetails: {
            semester,
            userDetails: {
              email_address,
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
          semester,
          userDetails: {
            email_address,
            verified,
            clerk_id,
            user_name,
          },
        },
      },
    });

    const deletedSemester = db.semester.deleteMany({
      where: {
        semester,
        userDetails: {
          email_address,
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
    console.error(userDetails, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(
          "User does not exist. Please contact the administrator."
        );
      }

      if (error.code === "P2025") {
        throw new Error(
          "An operation failed because it depends on one or more records that were required but not found."
        );
      }
      if (error.code === "P2018") {
        throw new Error("The required connected records were not found.");
      }
    }
    throw error;
  }
};
