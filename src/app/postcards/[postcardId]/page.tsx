"use client";

import { useEffect, useState } from "react";

import PostcardPreview from "@/components/PostcardPreview";
import TopNavigation from "@/components/TopNavigation";
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
        <p>Searching for your card</p>
      )}
    </div>
  );
}
