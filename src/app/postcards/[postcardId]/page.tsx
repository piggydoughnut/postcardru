"use client";

import { useEffect, useState } from "react";

import { H2 } from "@/components/Text";
import PostcardPreview from "@/components/PostcardPreview";
import TopNavigation from "@/components/TopNavigation";
import { Wrapper } from "@/components/Wrapper";
import path from "path";

type Person = {
  email: string;
  name: string;
};
export default function Page({ params }: { params: { postcardId: string } }) {
  const [cardParams, setCardParams] = useState(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch(`http://localhost:3000/api/postcards/${params.postcardId}`)
      .then((res) => res.json())
      .then((body) => setCardParams(body));
  }, [params]);

  return (
    <div className="flex flex-col justify-center items-center mt-4 max-w-[600px] mx-auto">
      <TopNavigation title="Your postcard" />
      {cardParams ? (
        <div className="flex flex-col items-center gap-8">
          <PostcardPreview cardParams={cardParams} mode="preview" />
          <a href="/" className="border-2 border-mainBlue px-1">
            Reply with a postcard
          </a>
        </div>
      ) : (
        <Wrapper className="flex pt-20 text-center">
          <div className="flex flex-row gap-2 items-baseline">
            <H2>Searching for your card</H2>
            <div className="animate-pulse">
              <div className="flex items-center justify-center space-x-1">
                <span className="dot dot1 h-1 w-1 bg-heavyBlue rounded-full"></span>
                <span className="dot dot2 h-1 w-1 bg-heavyBlue rounded-full"></span>
                <span className="dot dot3 h-1 w-1 bg-heavyBlue rounded-full"></span>
              </div>
            </div>
          </div>
        </Wrapper>
      )}
    </div>
  );
}
