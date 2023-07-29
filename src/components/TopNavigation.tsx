"use client";

import { Arrow } from "./Icons";
import Link from "next/link";

export default function TopNavigation({
  title = "Compose the postcard",
}: {
  title?: string;
}) {
  return (
    <div className="flex flex-row justify-between w-full">
      <a href="">
        <button onClick={() => history.back()}>
          <Arrow className="rotate-180" />
        </button>
      </a>
      <p className="text-mainBlue text-md">{title}</p>
      <Link className="text-paleBlue" href="/" replace={true} prefetch={true}>
        Home
      </Link>
    </div>
  );
}
