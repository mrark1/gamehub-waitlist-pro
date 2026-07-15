import path from "path";
import { fileURLToPath } from "url";

import { readJson } from "../utils/readJson.js";
import { writeJson } from "../utils/writeJson.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "../data/waitlist.json");

export const getAllPlayers = async () => {
  return await readJson(DATA_FILE);
};

export const savePlayers = async (players) => {
  await writeJson(DATA_FILE, players);
};