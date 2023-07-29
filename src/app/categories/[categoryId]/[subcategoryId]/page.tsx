import { H1, H4 } from "@/components/Text";

import ImageMesh from "@/components/ImageMesh";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { readFiles } from "@/helpers/file";

export default async function Page({
  params,
  searchParams,
}: {
  params: { categoryId: string; subcategoryId: string };
  searchParams: { page: number };
}) {
  const result = await readFiles(
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
        <div className="flex w-full items-start justify-around">
          <Link href="/" replace={true} prefetch={true}>
            <H4 className="italic text-paleBlue mt-20 ml-8">back</H4>
          </Link>
          <H1 className="text-center mb-20">Choose a postcard</H1>
          <div className="w-14"></div>
          {/* <button>
            <H4 className="italic text-paleBlue mt-20 mr-6">forward</H4>
          </button> */}
        </div>
        {!!result && (
          <ImageMesh
            images={result?.files}
            category={params.categoryId}
            subcategory={params.subcategoryId}
          />
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
