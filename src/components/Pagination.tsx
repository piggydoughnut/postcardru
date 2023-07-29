"use client";

import Image from "next/image";
import { addSearchParametersAndRefresh } from "@/helpers/general";
const PER_PAGE = 6;

export default function Pagination({
  total,
  chosenPage,
  className,
}: {
  total: number;
  chosenPage: number;
  className?: string;
}) {
  const pages = total / PER_PAGE;
  if (pages < 2) {
    return <></>;
  }
  const pagination = [];
  for (let i = 0; i < pages; i++) {
    pagination.push(i + 1);
  }

  const handleChoosingPage = (pageNum: number) =>
    addSearchParametersAndRefresh({ page: pageNum });

  return (
    <div className={`flex gap-1 ${className}`}>
      <Image src="/arr-back.gif" alt="arr-back" width={24} height={24} />
      {pagination.map((p) => {
        const amIChosen = Number(chosenPage) === p;
        return (
          <div
            className={`rounded-full w-6 border border-1 ${
              amIChosen ? "border-heavyBlue" : "border-purpleBlue"
            }  flex justify-center items-center shadow-md blur-xs`}
            key={p}
          >
            {amIChosen ? (
              <button
                onClick={() => handleChoosingPage(p)}
                className="text-heavyBlue blur-0"
              >
                {p}
              </button>
            ) : (
              <button
                onClick={() => handleChoosingPage(p)}
                className="text-purpleBlue blur-0"
              >
                {p}
              </button>
            )}
          </div>
        );
      })}
      <Image src="/arr-right.gif" alt="arr-right" width={24} height={24} />
    </div>
  );
}
