"use client";

import PostcardForm from "@/components/PostcardForm";
import PostcardPreview from "@/components/PostcardPreview";
import TopNavigation from "@/components/TopNavigation";
import path from "path";
import { useState } from "react";

const PostcardStates = {
  new: "new",
  preview: "preview",
  sending: "sending",
  sent: "sent",
  error: "error",
} as const;

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
    sub: string;
  };
}) {
  const [postCardState, setPostCardState] = useState<string>(
    PostcardStates.new
  );
  const [title, setTitle] = useState("");
  const [text, setText] = useState(
    "Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates don’t eat the tourists. Jaguar shark! So tell me - does it really exist? This thing comes fully loaded. AM/FM radio, reclining bucket seats, and... power windows. They're using our own satellites against us. And the clock is ticking."
  );
  const [recipient, setRecipient] = useState({
    name: "Mary",
    email: "mail@mail.com",
  });
  const [sender, setSender] = useState({ name: "Max", email: "mail@mail.com" });

  const [postcardId, setPostcardId] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const imagePath = path.resolve(
    "/postcards",
    searchParams.categoryId,
    !!searchParams.sub ? searchParams.sub : "",
    searchParams.fileName
  );
  return (
    <div className="flex flex-col justify-center items-center mt-4 max-w-[600px] mx-auto">
      <TopNavigation />
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
        <div>
          <h2> We are sending your card please be patient...</h2>
        </div>
      )}
      {postCardState === PostcardStates.sent && (
        <div>
          <h2> Your postcard was successfully sent</h2>
          <p>
            {" "}
            You can access it here:{" "}
            {`http://localhost:3000/postcards/${postcardId}`}
          </p>
        </div>
      )}
      {postCardState === PostcardStates.error && (
        <div>
          <h2> Err: {error}</h2>
        </div>
      )}
    </div>
  );
}
