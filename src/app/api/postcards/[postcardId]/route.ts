import { NextResponse } from "next/server";
import Postcard from "@/db/postcard";
import dbConnect from "@/db/connect";

function validateNineDigitNumber(input: string) {
  return /^\d+$/.test(input) && input.length === 9;
}

export async function GET(
  request: Request,
  { params }: { params: { postcardId: string } }
) {
  try {
    await dbConnect();
    if (!validateNineDigitNumber(params.postcardId)) {
      return NextResponse.json(null, { status: 400 });
    }
    const id = Number(params.postcardId);

    const postcard = await Postcard.findOne({
      postcardId: id,
    });
    if (!postcard) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json(postcard);
  } catch (e) {
    console.log(e);
    return NextResponse.json("whoops");
  }
}
