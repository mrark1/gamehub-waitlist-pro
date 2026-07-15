import express from "express";

import {
  getPlayers,
  getPlayerById,
  createNewPlayer,
  updatePlayer,
  deletePlayer,
  searchPlayers,
  filterByGame,
  filterByStatus
} from "../controllers/waitlist.controller.js";

import validate from "../middleware/validate.middleware.js";

import analytics from "../middleware/analytics.middleware.js";

import { playerValidation } from "../validators/waitlist.validator.js";

const router = express.Router();

/* READ */

router.get("/", getPlayers);

router.get("/search", searchPlayers);

router.get("/game/:game", filterByGame);

router.get("/status/:status", filterByStatus);

router.get("/:id", getPlayerById);

/* CREATE */

router.post(
  "/",
  playerValidation,
  validate,
  analytics("Player Created"),
  createNewPlayer
);


/* UPDATE */

router.put(
  "/:id",
  playerValidation,
  validate,
  analytics("Player Updated"),
  updatePlayer
);

/* DELETE */

router.delete(
  "/:id",
  analytics("Player Deleted"),
  deletePlayer
);

export default router;