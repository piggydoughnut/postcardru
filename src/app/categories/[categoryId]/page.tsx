import { postcardsPath, readFiles } from "@/helpers/file";

import { H1 } from "@/components/Text";
import ImageMesh from "@/components/ImageMesh";
import Pagination from "@/components/Pagination";

export default async function Page({
  params,
  searchParams,
}: {
  params: { categoryId: string; sub: string };
  searchParams: { page: number };
}) {
  const result = await readFiles(params.categoryId, searchParams?.page ?? 1);
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
