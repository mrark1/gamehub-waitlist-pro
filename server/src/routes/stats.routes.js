import express from "express";

import { getStats } from "../controllers/waitlist.controller.js";

const router = express.Router();

router.get("/", getStats);

export default router;