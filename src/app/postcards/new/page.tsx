"use client";

import { H1, H2 } from "@/components/Text";

import PostcardForm from "@/components/PostcardForm";
import PostcardPreview from "@/components/PostcardPreview";
import TopNavigation from "@/components/TopNavigation";
import { Wrapper } from "@/components/Wrapper";
import backgrounds from "@/helpers/backgrounds.json";
import path from "path";
import { sendEmail } from "@/helpers/email";
import { useState } from "react";

const PostcardStates = {
  new: "new",
  preview: "preview",
  sending: "sending",
  sent: "sent",
  error: "error",
} as const;

const Titles: Record<string, string> = {
  [PostcardStates.new]: "Compose the card",
  [PostcardStates.preview]: "Preview the card",
  [PostcardStates.sending]: "Sending",
  [PostcardStates.sent]: "Your card has been sent",
};

type Person = {
  email: string;
  name: string;
};
export default function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: {
    path: string;
    fileName: string;
    categoryId: string;
    subcategoryId: string;
  };
}) {
  const [postCardState, setPostCardState] = useState<string>(
    PostcardStates.new
  );
  const [title, setTitle] = useState("Hi!");
  const [text, setText] = useState("");
  const [music, setMusic] = useState("");
  const [background, setBackground] = useState("");
  const [recipient, setRecipient] = useState({
    name: "",
    email: "",
  });
  const [sender, setSender] = useState({ name: "", email: "" });
  const [postcardId, setPostcardId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const imagePath = path.resolve(
    "/postcardimages",
    searchParams.categoryId,
    !!searchParams.subcategoryId ? searchParams.subcategoryId : "",
    searchParams.fileName
  );

  const sendPostcard = async () => {
    try {
      setPostCardState(PostcardStates.sending);
      const response = await fetch(`/api/postcards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imagePath,
          title,
          text,
          recipient,
          sender,
          music,
        }),
      });
      if (response.status === 200) {
        const body = await response.json();
        await sendEmail(
          recipient.email,
          `${window.location.origin}/postcards/${body.id}`
        );
        setPostCardState(PostcardStates.sent);
        setPostcardId(body.id ?? null);
      } else {
        setError(response.statusText);
        setPostCardState(PostcardStates.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onNextStep = ({
    title,
    text,
    sender,
    recipient,
    music,
    background,
  }: {
    title: string;
    text: string;
    sender: Person;
    recipient: Person;
    music: string;
    background: string;
  }) => {
    setTitle(title);
    setText(text);
    setSender(sender);
    setRecipient(recipient);
    setMusic(music);
    setBackground(
      backgrounds.find((item) => item.eng === background)?.fileName ?? ""
    );
    setPostCardState(PostcardStates.preview);
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-4 max-w-[600px] mx-auto mb-2">
        <TopNavigation title={Titles[postCardState]} />
      </div>
      <div
        className="h-full bg-contain"
        style={{
          backgroundImage: `url(/backgrounds/${
            postCardState === PostcardStates.preview ? background : ""
          })`,
        }}
      >
        <div className="flex flex-col justify-center items-center mt-4 max-w-[600px] mx-auto mb-10">
          {postCardState === PostcardStates.new && (
            <PostcardForm
              imagePath={imagePath}
              onBack={() => history.back()}
              onNext={onNextStep}
            />
          )}
          {postCardState === PostcardStates.preview && (
            <PostcardPreview
              cardParams={{
                imagePath,
                text,
                background,
                title,
                sender,
                recipient,
              }}
            />
          )}
          {postCardState === PostcardStates.sending && (
            <Wrapper className="flex pt-20 text-center">
              <H2>We are sending your card please be patient...</H2>
            </Wrapper>
          )}
          {postcardId && postCardState === PostcardStates.sent && (
            <Wrapper className="flex pt-20 text-center">
              <div className="text-mainBlue">
                <H1>Postcard sent</H1>
                <p>
                  You can preview your sent postcard here: <br />
                  <a
                    className="underline hover:text-blue-600"
                    href={`${window.location.origin}/postcards/${postcardId}`}
                  >{`${window.location.origin}/postcards/${postcardId}`}</a>
                </p>
              </div>
            </Wrapper>
          )}
          {postCardState === PostcardStates.error && (
            <div>
              <h2> Err: {error}</h2>
            </div>
          )}
        </div>
      </div>
      {postCardState === PostcardStates.preview && (
        <div className="flex justify-between w-full mt-4 max-w-[600px] mx-auto">
          <input
            type="button"
            className="border-2 border-mainBlue px-1"
            value="Back"
            onClick={() => setPostCardState(PostcardStates.new)}
          ></input>
          <button
            type="submit"
            className="border-2 border-mainBlue px-1"
            onClick={() => sendPostcard()}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
