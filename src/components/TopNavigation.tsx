"use client";

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
        <Image
          src="/arr-back.gif"
          alt="arr-back"
          width={24}
          height={24}
          onClick={() => history.back()}
        />
      </a>
      <p className="text-mainBlue text-md">{title}</p>
      <Link href="/" replace={true} prefetch={true}>
        <Image src="/arr-top.gif" alt="arr-top" width={24} height={24} />
      </Link>
    </div>
  );
}
