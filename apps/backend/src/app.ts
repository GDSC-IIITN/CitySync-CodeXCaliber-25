import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./lib/config/env";

const app: Express = express();

// global middlwares
app.use(
    cors({
        origin: ["http://localhost:3000", env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test-route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// routes
import { authRouter, healthCheckRouter, secureRoutes } from "./routes";

app.use("/api", healthCheckRouter);
app.use("/api/auth", authRouter);
app.use("/api/secure", secureRoutes);

export default app;
