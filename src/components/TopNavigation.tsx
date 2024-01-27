"use client";

import { Arrow } from "./Icons";

export default function TopNavigation({
  title = "Compose the postcard",
}: {
  title?: string;
}) {
  return (
    <div className="flex flex-row justify-between w-full px-4 pt-4 sm:p-0">
      <a href="">
        <button onClick={() => history.back()}>
          <Arrow className="rotate-180 w-10 h-10 sm:w-6 sm:h-6" />
        </button>
      </a>
      <p className="text-mainBlue text-lg">{title}</p>
      <a href="/">
        <Arrow className="-rotate-90 w-10 h-10 sm:w-6 sm:h-6" />
      </a>
    </div>
  );
}
