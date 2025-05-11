import express, { Express } from "express";
import cors from "cors";
import { env } from "./lib/config/env";
import { healthCheckRouter } from "./routes/healtcheck.route";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3000", env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", healthCheckRouter);

export default app;
