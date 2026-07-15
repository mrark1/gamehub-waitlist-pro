import { v4 as uuidv4 } from "uuid";

import {
  getAllPlayers,
  savePlayers,
} from "../services/waitlist.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

import { createPlayer } from "../models/waitlist.model.js";

/* ======================================================
   GET ALL PLAYERS
   Pagination + Sorting
====================================================== */

export const getPlayers = async (req, res) => {
  try {
    let players = await getAllPlayers();

    /* ---------------- Search ---------------- */

    const search = req.query.search;

    if (search) {
      players = players.filter((player) =>
        player.playerName.toLowerCase().includes(search.toLowerCase()) ||
        player.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    /* ---------------- Filter by Game ---------------- */

    const game = req.query.game;

    if (game) {
      players = players.filter(
        (player) =>
          player.game.toLowerCase() === game.toLowerCase()
      );
    }

    /* ---------------- Filter by Status ---------------- */

    const status = req.query.status;

    if (status) {
      players = players.filter(
        (player) =>
          player.status.toLowerCase() === status.toLowerCase()
      );
    }

    /* ---------------- Sorting ---------------- */

    const sort = req.query.sort;

    if (sort === "name") {
      players.sort((a, b) =>
        a.playerName.localeCompare(b.playerName)
      );
    }

    if (sort === "date") {
      players.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    /* ---------------- Pagination ---------------- */

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const start = (page - 1) * limit;

    const end = start + limit;

    const paginatedPlayers = players.slice(start, end);

    return res.status(200).json({
      success: true,

      message: "Players fetched successfully",

      totalPlayers: players.length,

      currentPage: page,

      totalPages: Math.ceil(players.length / limit),

      players: paginatedPlayers
    });

  } catch (error) {

    return errorResponse(res, error.message);

  }
};

/* ======================================================
   GET PLAYER BY ID
====================================================== */

export const getPlayerById = async (req, res) => {
  try {
    const players = await getAllPlayers();

    const player = players.find(
      (p) => p.id === req.params.id
    );

    if (!player) {
      return errorResponse(
        res,
        "Player not found",
        [],
        404
      );
    }

    return successResponse(
      res,
      "Player found",
      player
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};


/* ======================================================
   CREATE PLAYER
====================================================== */

export const createNewPlayer = async (req, res) => {
  try {
    const players = await getAllPlayers();
    /* Check Duplicate Email */

const emailExists = players.some(
  (player) => player.email === req.body.email
);

if (emailExists) {
  return errorResponse(
    res,
    "Email already exists",
    [],
    400
  );
}
    /* Check Duplicate Phone */

const phoneExists = players.some(
  (player) => player.phone === req.body.phone
);

if (phoneExists) {
  return errorResponse(
    res,
    "Phone number already exists",
    [],
    400
  );
}
    const existingEmail = players.find(
  (player) => player.email === req.body.email
);

if (existingEmail) {
  return errorResponse(
    res,
    "Email already exists",
    [],
    400
  );
}
    const existingPhone = players.find(
  (player) => player.phone === req.body.phone
);

if (existingPhone) {
  return errorResponse(
    res,
    "Phone already exists",
    [],
    400
  );
}

    const player = createPlayer({
      id: uuidv4(),

      playerName: req.body.playerName,

      email: req.body.email,

      phone: req.body.phone,

      game: req.body.game,

      platform: req.body.platform,

      priority: req.body.priority,

      status: req.body.status,

      estimatedWait: req.body.estimatedWait || 0,

      notes: req.body.notes || "",

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),
    });

    players.push(player);

    await savePlayers(players);

    return successResponse(
      res,
      "Player added successfully",
      player,
      201
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/* ======================================================
   UPDATE PLAYER
====================================================== */

export const updatePlayer = async (req, res) => {
  try {
    const players = await getAllPlayers();

    const index = players.findIndex(
      (p) => p.id === req.params.id
    );

    if (index === -1) {
      return errorResponse(
        res,
        "Player not found",
        [],
        404
      );
    }

    players[index] = {
      ...players[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    await savePlayers(players);

    return successResponse(
      res,
      "Player updated successfully",
      players[index]
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/* ======================================================
   DELETE PLAYER
====================================================== */

export const deletePlayer = async (req, res) => {
  try {
    const players = await getAllPlayers();

    const index = players.findIndex(
      (p) => p.id === req.params.id
    );

    if (index === -1) {
      return errorResponse(
        res,
        "Player not found",
        [],
        404
      );
    }

    const deleted = players.splice(index, 1);

    await savePlayers(players);

    return successResponse(
      res,
      "Player deleted successfully",
      deleted[0]
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }

};

/* ======================================================
   SEARCH PLAYER
====================================================== */

export const searchPlayers = async (req, res) => {
  try {
    const players = await getAllPlayers();

    const keyword = (req.query.q || "").toLowerCase();

    const result = players.filter((player) => {
      return (
        player.playerName.toLowerCase().includes(keyword) ||
        player.email.toLowerCase().includes(keyword)
      );
    });

    return successResponse(
      res,
      "Search completed",
      result
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};


/* ======================================================
   FILTER BY GAME
====================================================== */

export const filterByGame = async (req, res) => {
  try {
    const players = await getAllPlayers();

    const gameName = req.params.game.toLowerCase();

    const filteredPlayers = players.filter(
      (player) => player.game.toLowerCase() === gameName
    );

    return successResponse(
      res,
      "Players filtered successfully",
      filteredPlayers
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/* ======================================================
   FILTER BY STATUS
====================================================== */

export const filterByStatus = async (req, res) => {
  try {
    const players = await getAllPlayers();

    const status = req.params.status.toLowerCase();

    const filteredPlayers = players.filter(
      (player) => player.status.toLowerCase() === status
    );

    if (filteredPlayers.length === 0) {
      return successResponse(
        res,
        `No players found with status: ${req.params.status}`,
        []
      );
    }

    return successResponse(
      res,
      "Players filtered by status successfully",
      filteredPlayers
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/* ======================================================
   GET DASHBOARD STATS
====================================================== */

export const getStats = async (req, res) => {
  try {
    const players = await getAllPlayers();

    const stats = {

    totalPlayers: players.length,

    waitingPlayers: players.filter(
        player => player.status === "Waiting"
    ).length,

    joinedPlayers: players.filter(
        player => player.status === "Joined"
    ).length,

    cancelledPlayers: players.filter(
        player => player.status === "Cancelled"
    ).length,

    completedPlayers: players.filter(
        player => player.status === "Completed"
    ).length,

    highPriorityPlayers: players.filter(
        player => player.priority === "High"
    ).length,

    games: {

        BGMI: players.filter(
            player => player.game === "BGMI"
        ).length,

        Valorant: players.filter(
            player => player.game === "Valorant"
        ).length,

        FreeFire: players.filter(
            player => player.game === "Free Fire"
        ).length,

        CS2: players.filter(
            player => player.game === "CS2"
        ).length

    }

};

    return successResponse(
      res,
      "Dashboard statistics fetched successfully",
      stats
    );

  } catch (error) {
    return errorResponse(res, error.message);
  }
};