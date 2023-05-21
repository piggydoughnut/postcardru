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

export type PostcardFile = {
  localPath: string;
  path: string;
  fileName: string;
  subCategoryName?: string;
  categoryName?: string;
};

export const readFolder = async (dir: string, total = 0, page = 0) => {
  const files = (await fs.readdir(dir)).filter(
    (f) => f !== ".DS_Store" && f !== "thumbs"
  );
  if (total && files.length > total) {
    const start = (page - 1) * total;
    return {
      result: files.slice(start, total + start),
      total: files.length,
    };
  }
  return {
    result: files,
    total: files.length,
  };
};

export const postcardsPath = (categoryId: string) =>
  path.join("./public/postcards", categoryId).toLowerCase();

export const readFiles = async (
  dir: string,
  categoryId: string,
  page: number
): Promise<{ files: PostcardFile[]; total: number } | null> => {
  const folderPath = postcardsPath(categoryId);
  try {
    if (categoriesWithSubcategories.includes(categoryId)) {
      let { result: folders, total } = await readFolder(dir);
      const fileNames = await Promise.all(
        folders.map(async (folder) => {
          const dir = path.resolve(folderPath, folder);
          let { result: files, total } = await readFolder(dir);
          return {
            localPath: path.resolve(folderPath, folder, "thumbs", files[0]),
            path: `/postcards/${categoryId.toLowerCase()}/${folder}/thumbs/${
              files[0]
            }`,
            fileName: files[0],
            categoryName: subcategoryNames[categoryId][folder].eng,
            subCategoryName: folder,
            total,
          };
        })
      );
      return {
        files: fileNames,
        total,
      };
    }

    let { result: filenames, total } = await readFolder(dir, 6, page);
    const res = filenames.map((f) => ({
      localPath: path.resolve(folderPath, "thumbs", f),
      path: `/postcards/${categoryId.toLowerCase()}/thumbs/${f}`,
      fileName: f,
    }));
    return {
      files: res,
      total,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};
