import db from "@/lib/db";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client/edge";

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
    first_name,
    username = "something",
    image_url,
    profile_image_url,
    id: clerk_id,
  } = payload.data;

  const email_address = email_addresses[0]?.email_address;
  const verifiedStatus =
    email_addresses[0]?.verification?.status === "verified";

  console.dir(payload.data);

  try {
    const userInfo = await db.user.findMany({
      where: {
        email_address,
        name: first_name,
        user_name: username,
        clerk_id,
      },
    });
    if (userInfo.length > 0) {
      console.log("Data is already exist!!!");
      return new Response("Data is already exist!!!", {
        status: 200,
      });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P1002") {
        throw new Response(
          "The database server was reached but timed out. Please try again.",
          {
            status: 400,
          }
        );
      }
      if (e.code === "P2002") {
        throw new Response(
          "There is a unique constraint violation, a new user cannot be created with this email",
          {
            status: 400,
          }
        );
      }
    }
    throw new Response("Something went wrong!!!", {
      status: 500,
    });
  }

  try {
    await db.user.create({
      data: {
        email_address,
        name: first_name,
        user_name: username,
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
    // console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P1002") {
        throw new Response(
          "The database server was reached but timed out. Please try again.",
          {
            status: 400,
          }
        );
      }
      if (error.code === "P2002") {
        throw new Response(
          "There is a unique constraint violation, a new user cannot be created with this email",
          {
            status: 400,
          }
        );
      }
      return new Response("Something went wrong!!!", {
        status: 500,
      });
    }
  }
}
