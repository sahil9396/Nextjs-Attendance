import db from "@/lib/db";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  if (evt.type === "user.created") {
    console.log("userId:", evt.data.id);
  }

  const {
    email_addresses,
    phone_numbers,
    first_name,
    username = "username",
    image_url,
    profile_image_url,
    id: clerk_id,
  } = payload.data;

  const email_address = email_addresses[0]?.email_address;
  const phone_number = phone_numbers[0]?.phone_number || "somethings";
  const verifiedStatus =
    email_addresses[0]?.verification?.status === "verified" &&
    phone_numbers[0]?.verification?.status === "verified";

  console.log("email_address:", email_address);
  console.log("phone_number:", phone_number);
  console.log("first_name:", first_name);
  console.log("username:", username);
  console.log("image_url:", image_url || profile_image_url);
  console.log("clerk_id:", clerk_id);
  console.log("verifiedStatus:", verifiedStatus);

  // return new Response("Data is created!!!", {
  //   status: 200,
  // });

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
        user_name: username || "username",
        image: image_url || profile_image_url,
        verified: verifiedStatus,
        clerk_id,
      },
      create: {
        email_address,
        phone_number,
        name: first_name,
        user_name: username || "username",
        image: image_url || profile_image_url,
        verified: verifiedStatus,
        clerk_id,
        semesters: {
          create: {
            semester: "semester-1",
          },
        },
      },
    });
    console.log("Data is created!!!");
    return new Response("Data is created!!!", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!!!", {
      status: 500,
    });
  }
}
