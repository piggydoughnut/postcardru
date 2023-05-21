"use client";

import { H1, H2 } from "@/components/Text";

import PostcardForm from "@/components/PostcardForm";
import PostcardPreview from "@/components/PostcardPreview";
import TopNavigation from "@/components/TopNavigation";
import { Wrapper } from "@/components/Wrapper";
import path from "path";
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
    subCategoryId: string;
  };
}) {
  const [postCardState, setPostCardState] = useState<string>(
    PostcardStates.new
  );
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [recipient, setRecipient] = useState({
    name: "",
    email: "",
  });
  const [sender, setSender] = useState({ name: "", email: "" });

  const [postcardId, setPostcardId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const imagePath = path.resolve(
    "/postcards",
    searchParams.categoryId,
    !!searchParams.subCategoryId ? searchParams.subCategoryId : "",
    searchParams.fileName
  );
  return (
    <div className="flex flex-col justify-center items-center mt-4 max-w-[600px] mx-auto">
      <TopNavigation title={Titles[postCardState]} />
      {postCardState === PostcardStates.new && (
        <PostcardForm
          imagePath={imagePath}
          onBack={() => history.back()}
          onNext={({
            title,
            text,
            sender,
            recipient,
          }: {
            title: string;
            text: string;
            sender: Person;
            recipient: Person;
          }) => {
            setTitle(title);
            setText(text);
            setSender(sender);
            setRecipient(recipient);
            setPostCardState(PostcardStates.preview);
          }}
        />
      )}
      {postCardState === PostcardStates.preview && (
        <PostcardPreview
          cardParams={{ imagePath, text, title, sender, recipient }}
          onSend={async () => {
            setPostCardState(PostcardStates.sending);
            const response = await fetch(
              `http://localhost:3000/api/postcards`,
              {
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
                }),
              }
            );
            if (response.status === 200) {
              const body = await response.json();
              setPostCardState(PostcardStates.sent);
              setPostcardId(body.id ?? null);
            } else {
              setError(response.statusText);
              setPostCardState(PostcardStates.error);
            }
          }}
          onBack={() => setPostCardState(PostcardStates.new)}
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
                href={`http://localhost:3000/postcards/${postcardId}`}
              >{`http://localhost:3000/postcards/${postcardId}`}</a>
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
  );
}
