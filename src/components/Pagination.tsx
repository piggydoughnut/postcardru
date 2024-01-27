"use client";

import { Arrow } from "./Icons";
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
  const pages = Math.round(total / PER_PAGE);
  const currentPage = Number(chosenPage);
  if (pages < 2) {
    return <></>;
  }
  const pagination = [];
  for (let i = 0; i < pages; i++) {
    pagination.push(i + 1);
  }

  const handleChoosingPage = (pageNum: number, total: number) => {
    let newPage = pageNum % total;
    if (!newPage) {
      newPage = pageNum;
    }
    addSearchParametersAndRefresh({ page: newPage });
  };

  return (
    <div className={`flex gap-3 mt-6 ${className}`}>
      <button
        onClick={() => {
          const nextPage = currentPage - 1;
          if (nextPage >= 1) {
            handleChoosingPage(nextPage, pages);
          }
        }}
        className={`${
          currentPage > 1 ? "hover:cursor-pointer" : "hover:cursor-default"
        } `}
      >
        <Arrow className="rotate-180 w-10 h-10 sm:w-6 sm:h-6" />
      </button>
      <div className="flex sm:gap-1 max-w-[300px] flex-wrap gap-2">
        {pagination.map((p) => {
          const amIChosen = currentPage === p;
          return (
            <button
              onClick={() => handleChoosingPage(p, pages)}
              className={`rounded-full w-10 h-10 sm:w-6 sm:h-6 border border-1 ${
                amIChosen
                  ? "border-heavyBlue text-heavyBlue blur-0"
                  : "border-purpleBlue text-purpleBlue blur-0"
              }  flex justify-center items-center shadow-md blur-xs`}
              key={p}
            >
              {p}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          const nextPage = currentPage + 1;
          if (nextPage <= pages) {
            handleChoosingPage(nextPage, pages);
          }
        }}
        className={`${
          currentPage != pages ? "hover:cursor-pointer" : "hover:cursor-default"
        } `}
      >
        <Arrow className="w-10 h-10 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}
