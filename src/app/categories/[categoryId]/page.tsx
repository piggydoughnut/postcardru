import { H1, H3 } from "@/components/Text";
import { postcardsPath, readFiles } from "@/helpers/file";

import Image from "next/image";
import ImageMesh from "@/components/ImageMesh";
import Pagination from "@/components/Pagination";
import path from "path";

const categoriesWithSubcategories = [
  "animals",
  "nature",
  "girls",
  "gallery",
  "flowers",
];

export default async function Page({
  params,
  searchParams,
}: {
  params: { categoryId: string; sub: string };
  searchParams: { page: number };
}) {
  const dir = path.resolve(postcardsPath(params.categoryId));
  const result = await readFiles(
    dir,
    params.categoryId,
    searchParams?.page ?? 1
  );
  return (
    <div>
      <div
        className="flex flex-col items-center min-h-[570px] bg-white bg-no-repeat bg-top-4 "
        style={{ backgroundImage: "url(/bg.svg)" }}
      >
        <H1 className="text-center mb-20 ">Choose a Postcard</H1>
        {!!result && (
          <ImageMesh images={result?.files} category={params.categoryId} />
        )}
      </div>
      {result && (
        <Pagination
          chosenPage={searchParams.page ?? 1}
          total={result?.total}
          className="justify-center"
        />
      )}
    </div>
  );
}
