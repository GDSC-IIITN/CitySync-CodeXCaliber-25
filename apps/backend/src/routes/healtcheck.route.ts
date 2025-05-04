import { Router } from "express";
import { healthCheckHandler } from "../controllers/healthCheck.controller";

export const healthCheckRouter: Router = Router();

healthCheckRouter.get("/healthcheck", healthCheckHandler);
