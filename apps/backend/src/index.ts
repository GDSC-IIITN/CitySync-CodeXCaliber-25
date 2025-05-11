import app from "./app";
import { env } from "./lib/config/env";

app.listen(env.PORT, () => {
  console.log("Server is running on port 3000");
  console.log("Frontend URL:", env.FRONTEND_URL);
  console.log(`Backend URL: http://localhost:${env.PORT}`);
});
