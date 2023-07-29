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
        <Arrow className="rotate-180" />
      </button>
      <div className="flex gap-1">
        {pagination.map((p) => {
          const amIChosen = currentPage === p;
          return (
            <div
              className={`rounded-full w-6 h-6 border border-1 ${
                amIChosen ? "border-heavyBlue" : "border-purpleBlue"
              }  flex justify-center items-center shadow-md blur-xs`}
              key={p}
            >
              {amIChosen ? (
                <button
                  onClick={() => handleChoosingPage(p, pages)}
                  className="text-heavyBlue blur-0"
                >
                  {p}
                </button>
              ) : (
                <button
                  onClick={() => handleChoosingPage(p, pages)}
                  className="text-purpleBlue blur-0"
                >
                  {p}
                </button>
              )}
            </div>
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
        <Arrow />
      </button>
    </div>
  );
}
