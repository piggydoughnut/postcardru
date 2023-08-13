"use client";

import { Arrow } from "./Icons";
import Image from "next/image";
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
      <p className="text-mainBlue text-lg">{title}</p>
      <Link href="/" replace={true} prefetch={true}>
        <Image src="/arr-top.gif" alt="arr-top" width={24} height={24} />
      </Link>
    </div>
  );
}
