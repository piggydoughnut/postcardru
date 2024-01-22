"use client";

import { H1, H2 } from "@/components/Text";
import { PostcardStates, Titles } from "@/helpers/consts";

import { CardParameters } from "@/helpers/types";
import PostcardForm from "@/components/PostcardForm";
import PostcardPreview from "@/components/PostcardPreview";
import React from "react";
import TopNavigation from "@/components/TopNavigation";
import { Wrapper } from "@/components/Wrapper";
import path from "path";
import { sendEmail } from "@/helpers/email";
import { sendPostcardApi } from "@/helpers/api";
import { useState } from "react";

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
  const [cardParams, setCardParams] = useState<CardParameters>({
    title: "Hi!",
    text: "",
    music: "",
    background: "",
    recipient: {
      name: "",
      email: "",
    },
    sender: {
      name: "",
      email: "",
    },
  });
  const [postcardId, setPostcardId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const imagePath = React.useMemo(
    () =>
      path.resolve(
        "/postcardimages",
        searchParams.categoryId,
        !!searchParams.subcategoryId ? searchParams.subcategoryId : "",
        searchParams.fileName
      ),
    [searchParams]
  );

  const backgroundUrl = React.useMemo(() => {
    if (cardParams.background) {
      return `url(/backgrounds/${
        postCardState === PostcardStates.preview ? cardParams.background : ""
      })`;
    }
  }, [cardParams.background, postCardState]);

  const sendPostcard = async () => {
    try {
      setPostCardState(PostcardStates.sending);
      const response = await sendPostcardApi({
        imagePath,
        ...cardParams,
      });
      if (response.status === 200) {
        const body = await response.json();
        await sendEmail(
          cardParams.recipient.email,
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

  const onNextStep = (params: CardParameters) => {
    setCardParams(params);
    setPostCardState(PostcardStates.preview);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-4 max-w-[600px] mx-auto mb-2">
        <TopNavigation title={Titles[postCardState]} />
      </div>
      <div
        className="h-full bg-repeat"
        style={{
          backgroundImage: backgroundUrl ?? null,
        }}
      >
        <div className="flex flex-col justify-center items-center mt-4 max-w-[600px] mx-auto mb-10">
          {postCardState === PostcardStates.new && (
            <PostcardForm
              imagePath={imagePath}
              onBack={() => history.back()}
              onNext={onNextStep}
              params={cardParams}
            />
          )}
          {postCardState === PostcardStates.preview && (
            <PostcardPreview
              cardParams={{
                imagePath,
                ...cardParams,
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
