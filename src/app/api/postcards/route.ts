import "@/lib/error-handlers";
import { NextResponse } from "next/server";
import Postcard from "@/db/postcard";
import dbConnect from "@/db/connect";
import { generateRandomNumber } from "@/helpers/general";
import validator from "validator";
import { sendEmail, sendConfirmationEmail } from "@/helpers/email";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Sanitize the input
    const normalizedSenderEmail = validator.normalizeEmail(body.sender.email);
    const normalizedRecipientEmail = validator.normalizeEmail(
      body.recipient.email
    );

    if (!normalizedSenderEmail || !normalizedRecipientEmail) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const sanitizedBody = {
      imagePath: body.imagePath,
      text: body.text,
      title: body.title,
      music: body.music,
      background: body.background,
      sender: {
        name: validator.escape(body.sender.name),
        email: normalizedSenderEmail,
      },
      recipient: {
        name: validator.escape(body.recipient.name),
        email: normalizedRecipientEmail,
      },
      postcardId: generateRandomNumber(),
    };

    const postcard = await Postcard.create(sanitizedBody);

    // Send email to recipient
    const origin = request.headers.get("origin") || request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (origin ? `${protocol}://${origin}` : "http://localhost:3000");
    const postcardUrl = `${baseUrl}/postcards/${postcard.postcardId}`;

    try {
      await Promise.all([
        sendEmail(sanitizedBody.recipient.email, postcardUrl),
        sendConfirmationEmail(sanitizedBody.sender.email, postcardUrl),
      ]);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json({ id: postcard.postcardId });
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
