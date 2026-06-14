import { app } from "./app.js";
import { env } from "./config/env.js";

app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`OneClick Corporate API running on ${env.API_URL}`);
});
