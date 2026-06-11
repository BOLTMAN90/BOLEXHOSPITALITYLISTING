import { NextResponse } from "next/server";
import {
  isValidSubscriberEmail,
  sendNewsletterNotification,
} from "@/lib/newsletter-email";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase() ?? "";

    if (!email) {
      return NextResponse.json(
        { error: "Please enter your email address." },
        { status: 400 }
      );
    }

    if (!isValidSubscriberEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await sendNewsletterNotification(email);

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully.",
    });
  } catch (error) {
    console.error("Newsletter subscription failed:", error);

    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}
