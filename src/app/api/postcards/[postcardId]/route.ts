import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Postcard from "@/db/postcard";
import dbConnect from "@/db/connect";

export async function GET(
  request: Request,
  { params }: { params: { postcardId: string } }
) {
  try {
    await dbConnect();
    const postcard = await Postcard.findOne({ postcardId: params.postcardId });
    if (!postcard) {
      return NextResponse.json("whoopsssss");
    }

    return NextResponse.json(postcard);
  } catch (e) {
    console.log(e);
    return NextResponse.json("whoops");
  }
}
