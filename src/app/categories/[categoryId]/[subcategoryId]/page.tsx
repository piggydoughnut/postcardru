import { H1, H3 } from "@/components/Text";
import { postcardsPath, readFiles } from "@/helpers/file";

import Image from "next/image";
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
  params: { categoryId: string; subcategoryId: string };
  searchParams: { page: number };
}) {
  const dir = path.resolve(
    postcardsPath(params.categoryId, params.subcategoryId)
  );
  const result = await readFiles(
    dir,
    params.categoryId,
    searchParams?.page ?? 1,
    params.subcategoryId
  );
  return (
    <div>
      <div
        className="flex flex-col items-center min-h-[570px] bg-white bg-no-repeat bg-top-4 "
        style={{ backgroundImage: "url(/bg.svg)" }}
      >
        <H1 className="text-center mb-20 ">Choose a Postcard</H1>
        <div className="flex gap-2 flex-wrap justify-center">
          {result?.files?.map((f) => {
            let imagePath = "";
            if (f.subCategoryName) {
              imagePath = `/categories/${params.categoryId}/${f.subCategoryName}`;
            } else {
              imagePath = `/postcards/new?categoryId=${params.categoryId}&subCategoryId=${params.subcategoryId}&fileName=${f.fileName}`;
            }

            return (
              <div key={f.fileName} className="w-1/4 flex justify-center">
                <a
                  href={imagePath}
                  className="small-stamp-border w-fit flex flex-col items-center justify-center text-mainBlue bg-white"
                >
                  <div className="">
                    <Image
                      src={f.path}
                      alt={f.fileName}
                      width={100}
                      height={100}
                    />
                    {f?.categoryName && (
                      <H3 className="text-center">{f.categoryName}</H3>
                    )}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
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
