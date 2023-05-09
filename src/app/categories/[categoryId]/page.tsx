import { H1, H2 } from "@/components/Text";
import { postcardsPath, readFiles } from "@/helpers/file";

import Image from "next/image";
import path from "path";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const dir = path.resolve(postcardsPath(params.categoryId));
  const files = await readFiles(dir, params.categoryId);

  return (
    <div
      className="flex flex-col justify-center items-center min-h-[540px] bg-white bg-no-repeat bg-top-4 "
      style={{ backgroundImage: "url(/bg.svg)" }}
    >
      <H1 className="text-center">Choose a Postcard {params.categoryId}</H1>
      <div className="flex gap-2 flex-wrap justify-center">
        {files?.map((f) => (
          <div key={f.fileName} className="w-1/4 flex justify-center">
            <div className="small-stamp-border w-fit">
              <Image src={f.path} alt={f.fileName} width={100} height={100} />
              {f?.categoryName && <p>{f.categoryName}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}