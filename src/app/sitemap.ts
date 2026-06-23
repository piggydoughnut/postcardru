import { MetadataRoute } from "next";
import categories from "@/helpers/categories.json";

type CategoryItem = {
  folderName: string;
  name: string;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryEntries = Object.entries(categories).flatMap(
    ([, items]: [string, any]) =>
      (items as CategoryItem[]).map((item) => ({
        url: `https://postcardru.com/categories/${item.folderName.toLowerCase()}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  return [
    {
      url: "https://postcardru.com",
      changeFrequency: "weekly",
      priority: 1,
    },
    ...categoryEntries,
  ];
}
