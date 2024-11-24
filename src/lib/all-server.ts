"use server";
import { currentUser } from "@clerk/nextjs/server";
import { userDetailstype } from "./type";
import db from "./db";
import { custom_cache } from "./utils";
import { cache } from "react";

export const getUserInfo = cache(async (): Promise<userDetailstype | null> => {
  const user = await currentUser();

  if (!user) {
    console.log("No user found");
    return null;
  }

  const user_email_address = user?.emailAddresses[0].emailAddress;
  const user_phone_number = user?.phoneNumbers[0].phoneNumber;
  const verifiedStatus =
    user?.emailAddresses[0]?.verification?.status ||
    user?.phoneNumbers[0]?.verification?.status;
  const clerk_id = user?.id;
  const user_name = user?.username;
  const first_name = user?.firstName;
  const image_url = user?.imageUrl;

  const returnData: userDetailstype = {
    email_address: user_email_address,
    phone_number: user_phone_number,
    first_name: first_name || "",
    user_name: user_name || "",
    verified: verifiedStatus === "verified" ? true : false,
    clerk_id,
    profile_image_url: image_url,
    image_url: image_url,
  };

  return returnData;
});

export const getSemesterList = custom_cache(
  async (user: userDetailstype) => {
    const { email_address, phone_number, verified, clerk_id, user_name } = user;
    try {
      const semesterList = await db.semester.findMany({
        where: {
          userDetails: {
            email_address,
            phone_number,
            verified,
            clerk_id,
            user_name,
          },
        },
        include: {
          userDetails: {
            select: {
              id: true,
            },
          },
        },
      });

      return semesterList;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  [],
  { tags: ["getSemesterList"] }
);
