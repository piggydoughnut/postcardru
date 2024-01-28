import { H3 } from "@/components/Text";
import Image from "next/image";
import { PostcardFile } from "@/helpers/file";

export default function ImageMesh({
  images,
  subcategory,
}: {
  images: PostcardFile[];
  subcategory?: string;
}) {
  return (
    <div className="flex gap-2 flex-wrap justify-center sm:min-w-[750px] mt-10 sm:mt-0 pb-4">
      {images?.map((f) => {
        return (
          <div
            key={f.fileName + f.categoryName}
            className="sm:w-1/4 flex justify-center"
          >
            <a
              href={f.imagePath}
              className="small-stamp-border w-fit flex flex-col items-center justify-center text-mainBlue bg-white"
            >
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={f.path}
                  alt={f.fileName}
                  width={100}
                  height={100}
                  className="h-[150px] sm:w-[100px] w-[150px] sm:h-[100px]"
                />
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
