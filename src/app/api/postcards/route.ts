import { NextResponse } from "next/server";
import Postcard from "@/db/postcard";
import dbConnect from "@/db/connect";
import { generateRandomNumber } from "@/helpers/general";
import validator from "validator";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Sanitize the input
    const sanitizedBody = {
      imagePath: body.imagePath,
      text: body.text,
      title: body.title,
      music: body.music,
      background: body.background,
      sender: {
        name: validator.escape(body.sender.name),
        email: validator.normalizeEmail(body.sender.email),
      },
      recipient: {
        name: validator.escape(body.recipient.name),
        email: validator.normalizeEmail(body.recipient.email),
      },
      postcardId: generateRandomNumber(),
    };

    const postcard = await Postcard.create(sanitizedBody);
    return NextResponse.json({ id: postcard.postcardId });
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
