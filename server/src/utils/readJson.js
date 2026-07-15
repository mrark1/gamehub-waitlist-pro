import fs from "fs/promises";

export const readJson = async (path) => {
  try {
    const data = await fs.readFile(path, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};