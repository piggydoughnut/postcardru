import { Background } from "@/components/Background";
import { H1 } from "@/components/Text";
import Image from "next/image";
import { RetrieveCard } from "@/components/RetrieveCard";
import categories from "@/helpers/categories.json";

const categoryNames: Record<string, any> = categories;

type CategoryItem = {
  folderName: string;
  name: string;
};

export default function Home() {
  return (
    <div className="bg-white ">
      <main className="flex flex-col bg-white ">
        <Background>
          <H1 className="text-center ">Greeting Postcards</H1>
          <div className="mt-28 flex flex-col max-w-[600px] mx-auto">
            <div className="-mt-2">
              <RetrieveCard />
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
        </Background>
      </main>
      <div className="mt-10">
        <div className="flex flex-col max-w-[700px] mx-auto flex-wrap stamp-border">
          {Object.keys(categories).map((category) => {
            return (
              <div key={category} className="px-4 py-1">
                <h2 className="capitalize text-mainBlue text-md">{category}</h2>
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
