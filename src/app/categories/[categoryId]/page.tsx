import { categoriesWithSubcategories, readFiles } from "@/helpers/file";

import { Background } from "@/components/Background";
import ImageMesh from "@/components/ImageMesh";
import { PageHeader } from "@/components/PageHeader";
import Pagination from "@/components/Pagination";

export default async function Page({
  params,
  searchParams,
}: {
  params: { categoryId: string; sub: string };
  searchParams: { page: number };
}) {
  const result = await readFiles(params.categoryId, searchParams?.page ?? 1);
  const subcategoriesExist = categoriesWithSubcategories.includes(
    params.categoryId
  );
  return (
    <div>
      <div className="flex flex-col items-center flex-wrap sm:min-w-[700px] bg-white  ">
        <Background>
          {" "}
          <PageHeader title="Choose a postcard" />
          {!!result && <ImageMesh images={result?.files} />}
        </Background>
      </div>
      {result && !subcategoriesExist && (
        <Pagination
          chosenPage={searchParams.page ?? 1}
          total={result?.total}
          className="justify-center"
        />
      )}
    </div>
  );
}
