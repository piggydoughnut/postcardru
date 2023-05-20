import { H1, H3, P } from "@/components/Text";
import { postcardsPath, readFiles } from "@/helpers/file";

import Image from "next/image";
import Pagination from "@/components/Pagination";
import TopNavigation from "@/components/TopNavigation";
import path from "path";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const dir = path.resolve(postcardsPath(params.categoryId));
  const result = await readFiles(dir, params.categoryId);

  return (
    <div>
      <H1 className="text-center mb-10">Choose a Postcard</H1>
      <div className="flex gap-2 flex-wrap justify-center">
        {result?.files?.map((f) => {
          const imagePath = `/postcards/new?categoryId=${
            params.categoryId
          }&fileName=${f.fileName}${
            !!f.subCategoryName ? `&sub=${f.subCategoryName}` : ""
          }`;
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
      {result && <Pagination total={result?.total} chosenPage={1} />}
    </div>
  );
}
