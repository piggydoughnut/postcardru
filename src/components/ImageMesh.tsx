import { H3 } from "@/components/Text";
import Image from "next/image";
import { PostcardFile } from "@/helpers/file";

export default function ImageMesh({
  images,
  category,
  subcategory,
}: {
  images: PostcardFile[];
  category: string;
  subcategory?: string;
}) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {images?.map((f) => {
        return (
          <div key={f.fileName} className="w-1/4 flex justify-center">
            <a
              href={f.imagePath}
              className="small-stamp-border w-fit flex flex-col items-center justify-center text-mainBlue bg-white"
            >
              <div className="">
                <Image src={f.path} alt={f.fileName} width={100} height={100} />
                {f?.categoryName && !subcategory && (
                  <H3 className="text-center">{f.categoryName}</H3>
                )}
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}
