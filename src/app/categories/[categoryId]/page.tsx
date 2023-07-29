import { H1, H3, H4 } from "@/components/Text";
import { postcardsPath, readFiles } from "@/helpers/file";

import ImageMesh from "@/components/ImageMesh";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { addSearchParametersAndRefresh } from "@/helpers/general";

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
        <div className="flex w-full items-start justify-around">
          <Link href="/" replace={true} prefetch={true}>
            <H4 className="italic text-paleBlue mt-20 ml-8">back</H4>
          </Link>
          <H1 className="text-center mb-20 ">Choose a postcard</H1>
          <button>
            <H4 className="italic text-paleBlue mt-20 mr-6">forward</H4>
          </button>
        </div>
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
