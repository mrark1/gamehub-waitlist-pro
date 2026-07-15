import fs from "fs/promises";

export const writeJson = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};