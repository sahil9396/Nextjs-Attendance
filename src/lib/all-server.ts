"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { eventType, userDetailstype } from "./type";
import db from "./db";
import { custom_cache } from "./utils";
import { cache } from "react";
import { revalidateTag } from "next/cache";

export const getUserInfo = cache(async (): Promise<userDetailstype | null> => {
  const user = await currentUser();

  if (!user) {
    console.log("No user found");
    return null;
  }

  const user_email_address = user?.emailAddresses[0].emailAddress;
  const verifiedStatus =
    user?.emailAddresses[0]?.verification?.status ||
    user?.phoneNumbers[0]?.verification?.status;
  const clerk_id = user?.id;
  const user_name = user?.username;
  const first_name = user?.firstName;
  const image_url = user?.imageUrl;

  const returnData: userDetailstype = {
    email_address: user_email_address,
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
    const { email_address, verified, clerk_id, user_name } = user;
    try {
      const semesterList = await db.semester.findMany({
        where: {
          userDetails: {
            email_address,
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

export async function createCalender(event: eventType) {
  try {
    const user = await currentUser();
    if (!user) {
      return;
    }

    const clerkResponse = (await clerkClient()).users.getUserOauthAccessToken(
      user.id,
      "oauth_google"
    );

    const { token } = (await clerkResponse).data[0];
    if (!token) {
      return "No token found";
    }

    const GOOGLE_CREATE_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/primary/events`;
    let response = await fetch(GOOGLE_CREATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.error("Failed to get token:", error);
    return "Failed";
  }
}

export async function resettheSemester() {
  console.log("resetting the semester");
  revalidateTag("getSemesterList");
  return null;
}
