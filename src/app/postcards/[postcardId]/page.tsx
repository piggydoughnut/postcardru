"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { CardParameters } from "@/helpers/types";
import { H2 } from "@/components/Text";
import PostcardPreview from "@/components/PostcardPreview";
import { PostcardStates } from "@/helpers/consts";
import React from "react";
import TopNavigation from "@/components/TopNavigation";
import { Wrapper } from "@/components/Wrapper";

export default function Page({ params }: { params: { postcardId: string } }) {
  const [cardParams, setCardParams] = useState<CardParameters>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch(`/api/postcards/${params.postcardId}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setError("Card not found");
        }
      })
      .then((body) => {
        setCardParams(body);
      })
      .catch((e) => console.log(e));
  }, [params]);

  const backgroundUrl = React.useMemo(() => {
    if (cardParams?.background) {
      return `url(/backgrounds/${cardParams.background})`;
    }
  }, [cardParams?.background]);

  return (
    <div className="mb-6">
      <div className="max-w-[600px] mx-auto">
        <TopNavigation title="Your postcard" />
      </div>
      <div
        className="flex flex-col justify-center items-center mt-4 mx-auto h-full bg-repeat"
        style={{
          backgroundImage: backgroundUrl ?? "",
        }}
      >
        {cardParams ? (
          <div className="flex flex-col items-center gap-8">
            <PostcardPreview
              cardParams={cardParams}
              mode={PostcardStates.complete}
            />
          </div>
        ) : (
          <Wrapper className="flex pt-20 text-center w-full sm:min-w-[600px]">
            <div>
              {!error && (
                <div className="flex flex-row gap-4 items-baseline">
                  <H2>Searching for your card</H2>
                  <div className="animate-ping">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="dot dot1 h-1 w-1 bg-heavyBlue rounded-full"></span>
                      <span className="dot dot2 h-1 w-1 bg-heavyBlue rounded-full"></span>
                      <span className="dot dot3 h-1 w-1 bg-heavyBlue rounded-full"></span>
                    </div>
                  </div>
                </div>
              )}
              {error && <H2 className="text-red-500">{error}</H2>}
            </div>
          </Wrapper>
        )}
      </div>
      {cardParams && <Button title="Reply with a postcard" link="/" />}
    </div>
  );
}
