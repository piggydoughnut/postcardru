import * as fs from "node:fs/promises";

import path from "path";
import subcategories from "../../data/subcategories.json";

const categoriesWithSubcategories = [
  "animals",
  "nature",
  "girls",
  "gallery",
  "flowers",
];

const subcategoryNames: Record<string, any> = subcategories;

type PostcardFile = {
  localPath: string;
  path: string;
  fileName: string;
  categoryName?: string;
};

export const readFolder = async (dir: string, total = 0, page = 0) => {
  const files = (await fs.readdir(dir)).filter((f) => f !== ".DS_Store");
  if (total && files.length > total) {
    return files.slice(page, total);
  }
  return files;
};

export const postcardsPath = (categoryId: string) =>
  path.join("./public/postcards", categoryId).toLowerCase();

export const readFiles = async (
  dir: string,
  categoryId: string
): Promise<PostcardFile[] | null> => {
  const folderPath = postcardsPath(categoryId);
  try {
    if (categoriesWithSubcategories.includes(categoryId)) {
      let folders = await readFolder(dir);
      const fileNames = await Promise.all(
        folders.map(async (folder) => {
          const dir = path.resolve(folderPath, folder);
          let files = await readFolder(dir);
          return {
            localPath: path.resolve(folderPath, folder, "thumbs", files[0]),
            path: `/postcards/${categoryId.toLowerCase()}/${folder}/thumbs/${
              files[0]
            }`,
            fileName: files[0],
            categoryName: subcategoryNames[categoryId][folder].eng,
          };
        })
      );
      return fileNames;
    }

    let filenames = await readFolder(dir, 6, 1);
    return filenames.map((f) => ({
      localPath: path.resolve(folderPath, "thumbs", f),
      path: `/postcards/${categoryId.toLowerCase()}/thumbs/${f}`,
      fileName: f,
    }));
  } catch (e) {
    console.log(e);
    return null;
  }
};