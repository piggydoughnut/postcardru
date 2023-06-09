import { H1, H2 } from "../components/Text";

import Image from "next/image";
import categories from "@/helpers/categories.json";

const categoryNames: Record<string, any> = categories;

type CategoryItem = {
  folderName: string;
  name: string;
};

export default function Home() {
  return (
    <div className="bg-white ">
      <main
        className="flex min-h-[570px] flex-col bg-white bg-no-repeat bg-top-4"
        style={{ backgroundImage: "url(bg.svg)" }}
      >
        <div>
          <H1 className="text-center ">Greeting Postcards</H1>
          <div className="mt-28 flex flex-col max-w-[600px] mx-auto">
            <div className="">
              <H2 className="ml-20">get my postcard</H2>
              <div className="flex flex-row gap-2">
                <H2>code: </H2>
                <input className="border border-l-1 border-l-[#5B00E6] border-r-1 border-r-[#E6E6E6] inset-1 border-t-1 border-t-[#000080] w-32"></input>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <a href="/categories/flowers">
              <Image
                src="stamps/stamp-flowers.svg"
                height={150}
                width={120}
                alt="flowers"
                className="-rotate-3 mt-6 bg-white"
              ></Image>
            </a>
            <a href="/categories/animals">
              <Image
                src="stamps/stamp-animals.svg"
                height={150}
                width={120}
                alt="animals"
                className="rotate-3 bg-white"
              ></Image>
            </a>
            <a href="/categories/girls">
              <Image
                src="stamps/stamp-girl.svg"
                height={150}
                width={120}
                alt="girls"
                className="-rotate-3 mt-6 bg-white"
              ></Image>
            </a>
            <a href="/categories/nature">
              <Image
                src="stamps/stamp-nature.svg"
                height={150}
                width={120}
                alt="nature"
                className="rotate-2 bg-white"
              ></Image>
            </a>
          </div>
        </div>
      </main>
      <div className="mt-10">
        <div className="flex flex-col max-w-[700px] mx-auto flex-wrap stamp-border">
          {Object.keys(categories).map((category) => {
            return (
              <div key={category} className="px-4 py-1">
                <h2 className="capitalize text-lg text-mainBlue text-md">
                  {category}
                </h2>
                <div className="flex flex-wrap mb-2">
                  {categoryNames[category].map(
                    (item: CategoryItem, idx: number) => (
                      <div key={item.name} className="m-0">
                        {idx > 0 && (
                          <span className="text-heavyBlue "> | </span>
                        )}
                        <a
                          href={`/categories/${item.folderName.toLowerCase()}`}
                          className="text-heavyBlue hover:underline hover:opacity-80"
                        >
                          {item.name}
                        </a>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
