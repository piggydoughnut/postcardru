import * as fs from "node:fs/promises";

import directories from "@/helpers/directories.json";
import path from "path";
import subcategories from "@/helpers/subcategories.json";

const dirs: Record<string, any> = directories;
export const categoriesWithSubcategories = [
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
  imagePath: string;
  subCategoryName?: string;
  categoryName?: string;
};

const findFolder = (folders: any, targetFolder: any): any => {
  for (const [folderName, folder] of Object.entries(folders)) {
    if (folderName === targetFolder) {
      return folder;
    }
    // @ts-ignore
    if (folder.folders) {
      // @ts-ignore
      const nestedFolder = findFolder(folder.folders, targetFolder);
      if (nestedFolder) {
        return nestedFolder;
      }
    }
  }

  return null;
};

export const readFromJson = (
  categoryId: string,
  type = "files",
  total = 0,
  page = 0
) => {
  const files = findFolder(dirs, categoryId)[type];
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

export const postcardsPath = (categoryId: string, sub?: string) => {
  return path
    .join(process.cwd(), "postcardimages", categoryId, sub ? sub : "")
    .toLowerCase();
};

export const readFiles = async (
  categoryId: string,
  page: number,
  subCategoryId?: string
): Promise<{ files: PostcardFile[]; total: number } | null> => {
  const folderPath = postcardsPath(categoryId, subCategoryId);

  const getFileObject = (
    folder: string | undefined,
    file: string,
    total: number
  ) => {
    const subcategoryQuery = subCategoryId
      ? `&subcategoryId=${subCategoryId}`
      : "";
    const cat = categoryId.toLowerCase();
    let imagePath;
    if (subCategoryId === folder) {
      imagePath = `/postcards/new?categoryId=${cat}${subcategoryQuery}&fileName=${file}`;
    } else {
      imagePath = `/categories/${cat}/${folder}`;
    }
    return {
      localPath: path.resolve(folderPath, folder ?? "", "thumbs", file),
      path: path.resolve(`/postcardimages/`, cat, folder ?? "", "thumbs", file),
      fileName: file,
      categoryName: folder ? subcategoryNames[categoryId][folder].eng : "",
      subCategoryName: subCategoryId ?? null,
      imagePath,
      total,
    };
  };

  try {
    let files;
    if (!subCategoryId && categoriesWithSubcategories.includes(categoryId)) {
      const { result: folders, total } = readFromJson(categoryId, "folders");
      files = Object.entries(folders).map(([subfolder, data]) => {
        // @ts-ignore
        return getFileObject(subfolder, data.files[0], total);
      });
      // @ts-ignore
      return { files, total };
    }

    const { result: filenames, total } = readFromJson(
      subCategoryId ?? categoryId,
      "files",
      6,
      page
    );

    files = filenames.map((f: string) =>
      getFileObject(subCategoryId, f, total)
    );
    return { files, total };
  } catch (e) {
    console.log(e);
    return null;
  }
};
