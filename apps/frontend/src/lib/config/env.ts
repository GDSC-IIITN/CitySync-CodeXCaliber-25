import { createEnv } from "@t3-oss/env-nextjs";
import { defaultEmptyString } from "../validation/base.schema";

export const env = createEnv({
    client: {
        NEXT_PUBLIC_URL: defaultEmptyString,
        NEXT_PUBLIC_API_URL: defaultEmptyString,
    },
    runtimeEnv: {
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
});
