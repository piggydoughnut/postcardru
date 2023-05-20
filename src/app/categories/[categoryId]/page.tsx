import { postcardsPath, readFiles } from "@/helpers/file";

import { H1 } from "@/components/Text";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import path from "path";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const dir = path.resolve(postcardsPath(params.categoryId));
  const result = await readFiles(dir, params.categoryId);

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="flex flex-col justify-center items-center min-h-[540px] bg-white bg-no-repeat bg-top-4 "
        style={{ backgroundImage: "url(/bg.svg)" }}
      >
        <H1 className="text-center">Choose a Postcard {params.categoryId}</H1>
        <p>Total: {result?.total}</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {result?.files?.map((f) => {
            const imagePath = `/postcards/new?categoryId=${
              params.categoryId
            }&fileName=${f.fileName}${
              !!f.subCategoryName ? `&sub=${f.subCategoryName}` : ""
            }`;
            return (
              <div key={f.fileName} className="w-1/4 flex justify-center">
                <a href={imagePath} className="small-stamp-border w-fit">
                  <Image
                    src={f.path}
                    alt={f.fileName}
                    width={100}
                    height={100}
                  />
                  {f?.categoryName && <p>{f.categoryName}</p>}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      {result && <Pagination total={result?.total} chosenPage={1} />}
    </div>
  );
}
