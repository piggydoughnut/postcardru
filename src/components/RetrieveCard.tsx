"use client";

import { H2 } from "./Text";
import { Tick } from "./Icons";
import { useState } from "react";

export const RetrieveCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  return (
    <div className="">
      <H2 className="ml-20">get my postcard</H2>
      <div className="flex flex-row gap-2 items-center">
        <H2 className="text-lg">code: </H2>
        <input
          className="border border-l-1 border-l-[#5B00E6] border-r-1 border-r-[#E6E6E6] inset-1 border-t-1 border-t-[#000080] w-32 h-7"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        ></input>
        <button
          className="ml-10 -mt-4"
          onClick={() => (window.location.href = `/postcards/${cardNumber}`)}
        >
          <Tick />
        </button>
      </div>
    </div>
  );
};
