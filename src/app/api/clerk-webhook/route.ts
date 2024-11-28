import db from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const body:
    | {
        data: {
          email_addresses: {
            email_address: string;
            verification: { status: string };
          }[];
          phone_numbers: {
            phone_number: string;
            verification: { status: string };
          }[];
          first_name: string;
          username: string;
          image_url: string;
          profile_image_url: string;
          id: string;
        };
      }
    | null
    | undefined = await req.json();

  if (!body) {
    return new NextResponse("Invalid request!!!", {
      status: 400,
    });
  }
  const {
    email_addresses,
    phone_numbers,
    first_name,
    username,
    image_url,
    profile_image_url,
    id: clerk_id,
  } = body.data;

  const email_address = email_addresses[0]?.email_address;
  const phone_number = phone_numbers[0]?.phone_number;
  const verifiedStatus =
    email_addresses[0]?.verification?.status === "verified" &&
    phone_numbers[0]?.verification?.status === "verified";

  try {
    await db.user.upsert({
      where: {
        email_address,
        phone_number,
      },
      update: {
        email_address,
        phone_number,
        name: first_name,
        user_name: username,
        image: image_url || profile_image_url,
        verified: verifiedStatus,
        clerk_id,
      },
      create: {
        email_address,
        phone_number,
        name: first_name,
        user_name: username,
        image: image_url || profile_image_url,
        verified: verifiedStatus,
        clerk_id,
      },
    });
    return new NextResponse("Data is created!!!", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong!!!", {
      status: 500,
    });
  }
}
