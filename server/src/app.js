import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./middleware/logger.middleware.js";
import requestId from "./middleware/requestId.middleware.js";
import waitlistRoutes from "./routes/waitlist.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import healthRoutes from "./routes/health.routes.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

/* ------------------------- Middleware ------------------------- */

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(logger);
app.use(requestId);
/* -------------------------- Home Route ------------------------- */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        project: "GameHub Waitlist API",
        version: "1.0.0",
        author: "Arpit Raj Katiyar",
        status: "Running 🚀"
    });
});

/* --------------------------- Routes ---------------------------- */

app.use("/api/v1/waitlist", waitlistRoutes);

app.use("/api/v1/stats", statsRoutes);

app.use("/api/v1/health", healthRoutes);

/* ------------------------- Middleware -------------------------- */

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;