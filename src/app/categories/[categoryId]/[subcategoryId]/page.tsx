import { Background } from "@/components/Background";
import ImageMesh from "@/components/ImageMesh";
import { PageHeader } from "@/components/PageHeader";
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
      <div className="flex flex-col items-center bg-white">
        <Background>
          <PageHeader title="Choose a postcard" />
          {!!result && (
            <ImageMesh
              images={result?.files}
              subcategory={params.subcategoryId}
            />
          )}
        </Background>
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
