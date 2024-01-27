import { H1, H4 } from "./Text";

import Link from "next/link";

export const PageHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full items-start justify-around">
      <a href="/">
        <H4 className="italic text-paleBlue mt-8 sm:mt-20 ml-4 sm:ml-8">
          back
        </H4>
      </a>
      <H1 className="text-center mb-20 text-[24px] tracking-normal sm:tracking-widest">
        {title}
      </H1>
      <div className="w-14"></div>
    </div>
  );
};
