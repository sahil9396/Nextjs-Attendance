"use server";
import { createCalender } from "@/lib/all-server";
import { color_id, getDate } from "@/lib/constants";
import db from "@/lib/db";
import {
  eventType,
  inputData,
  SingleSemester,
  userDetailstype,
} from "@/lib/type";
import { revalidateTag } from "next/cache";

export const updateStatus = async (
  userDetails: userDetailstype,
  inputData: inputData,
  status: string,
  semesterInfo: SingleSemester,
  ExtraClass: boolean = false
) => {
  const { email_address, verified, clerk_id, user_name } = userDetails;

  const currentTime = getDate();
  const timeofcourseSplit = inputData.timeofcourse.split(" - ");
  const startTime = timeofcourseSplit[0];
  const endTime = timeofcourseSplit[1];
  const updateStatus = {
    present: inputData.present,
    absent: inputData.absent,
    cancelled: inputData.cancelled,
    [status]: (inputData[status] as number) + 1,
  };

  const event: eventType = {
    summary: `${ExtraClass ? "Extra Class" : "Class"} : ${
      inputData.IndivCourse
    } ( ${semesterInfo.semester})`,

    description: ` ${ExtraClass ? "Extra Class" : "Class"} :( p : ${
      updateStatus.present
    } ) ,( a : ${updateStatus.absent} ) , ( c : ${updateStatus.cancelled} )`,

    start: {
      dateTime: `${currentTime}T${startTime}:00+05:30`,
      timeZone: "IST",
    },
    end: {
      dateTime: `${currentTime}T${endTime}:00+05:30`,
      timeZone: "IST",
    },
    colorId: color_id[status],
  };

  try {
    const reponse = await createCalender(event);
    if (reponse === "Failed") return reponse;
    await db.course.updateMany({
      where: {
        semesterDetails: {
          semester: semesterInfo.semester,
          id: semesterInfo.id,
          userDetails: {
            email_address,
            verified,
            clerk_id,
            user_name,
          },
        },
        IndivCourse: inputData.IndivCourse,
      },
      data: {
        [status]: { increment: 1 },
      },
    });

    revalidateTag("getList");
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
