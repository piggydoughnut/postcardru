"use client";
const HSeparator = ({ className }: { className?: string }) => (
  <div
    className={`mt-4 mb-2 w-full border border-b-[0.5px] opacity-50 border-heavyBlue , ${className}`}
  ></div>
);

import Image from "next/image";
import { Wrapper } from "./Wrapper";
type Person = {
  email: string;
  name: string;
};
export default function PostcardPreview({
  cardParams,
  mode = "preview",
  onBack,
  onSend,
}: {
  cardParams: {
    imagePath: string;
    text: string;
    title: string;
    sender: Person;
    recipient: Person;
  };
  mode?: string;
  onBack?: () => void;
  onSend?: () => void;
}) {
  return (
    <div>
      <Wrapper>
        <Image
          src={cardParams.imagePath}
          height={300}
          width={400}
          alt={cardParams.imagePath}
        />
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
      {onSend && (
        <div className="flex justify-between w-full mt-4">
          <input
            type="button"
            className="border-2 border-mainBlue px-1"
            value="Back"
            onClick={onBack}
          ></input>
          <button
            type="submit"
            className="border-2 border-mainBlue px-1"
            onClick={() => {
              onSend();
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
