import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { config } from "dotenv";

config();

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        PORT: z.coerce.number().default(3000),
        FRONTEND_URL: z.string().url().default("http://localhost:3000"),
        JWT_SECRET: z.string().default("supersecret"),
    },
    runtimeEnv: process.env,
});
