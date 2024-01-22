"use client";
const HSeparator = ({ className }: { className?: string }) => (
  <div
    className={`mt-4 mb-2 w-full border border-b-[0.5px] opacity-50 border-heavyBlue , ${className}`}
  ></div>
);

import AudioPlayer from "./AudioPlayer";
import { CardParameters } from "@/helpers/types";
import Image from "next/image";
import { PostcardStates } from "@/helpers/consts";
import { Wrapper } from "./Wrapper";
import { getMusicPath } from "@/helpers/general";
import { useMemo } from "react";

export default function PostcardPreview({
  cardParams,
  mode = PostcardStates.preview,
}: {
  cardParams: CardParameters;
  mode?: string;
}) {
  const musicUrl = useMemo(
    () => getMusicPath(cardParams.music),
    [cardParams.music]
  );

  if (!Object.keys(cardParams).length) {
    return <></>;
  }

  return (
    <div>
      <Wrapper>
        <Image
          src={cardParams.imagePath ?? ""}
          height={300}
          width={400}
          alt={cardParams.title}
        />
        <div className="my-4">
          <p>Your card comes with audio</p>
          <AudioPlayer src={musicUrl} />
        </div>
        <HSeparator />
        <div className="grid grid-cols-2 px-2 w-full">
          <div className="mt-2 border-r-[0.5px] border-heavyBlue pr-2">
            <p className="text-center text-blue-600 italic">
              {cardParams.title}
            </p>
            <p className="mt-8 text-blue-500">{cardParams.text}</p>
          </div>
          <div className="flex flex-col pl-2 justify-end">
            <Image
              src={"/compose-stamp.gif"}
              alt="book"
              height={153}
              width={251}
              className="self-end"
            />
            <div className="flex flex-col items-center mb-4">
              <div className="flex flex-col  gap-1">
                <p className="ml-[-18px] text-mainBlue">To:</p>
                <div className="flex self-end flex-col gap-2">
                  <p>{cardParams.recipient.name}</p>
                  <p>{cardParams.recipient.email}</p>
                </div>
              </div>
              {mode === "preview" && (
                <div>
                  <HSeparator className="w-[200px]" />
                  <div className=" flex flex-col gap-1">
                    <p className="ml-[-18px] text-mainBlue">From:</p>
                    <div className="flex self-end flex-col gap-2">
                      <p>{cardParams.sender.name}</p>
                      <p>{cardParams.sender.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
