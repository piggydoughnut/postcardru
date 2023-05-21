"use client";

import Image from "next/image";
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

  const handleChoosingPage = (pageNum: number) => {
    window.location.href = `${window.location.hostname}/${window.location.pathname}?page=${pageNum}`;
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      <Image src="/arr-back.gif" alt="arr-back" width={24} height={24} />
      {pagination.map((p) => (
        <div
          className={`rounded-full w-6 border border-1 ${
            chosenPage === p ? "border-[#4C648E]" : "border-[#B6C1D9]"
          }  flex justify-center items-center shadow-md blur-xs`}
          key={p}
        >
          {p === chosenPage ? (
            <button
              onClick={() => handleChoosingPage(p)}
              className="text-[#4C648E] blur-0"
            >
              {p}
            </button>
          ) : (
            <button
              onClick={() => handleChoosingPage(p)}
              className="text-[#A7BBD2] blur-0"
            >
              {p}
            </button>
          )}
        </div>
      ))}
      <Image src="/arr-right.gif" alt="arr-right" width={24} height={24} />
    </div>
  );
}
