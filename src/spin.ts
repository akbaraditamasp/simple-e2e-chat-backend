import "dotenv/config";
import { readdirSync } from "fs";
import { dirname, join } from "path";
import app from "./modules/app.js";
import db from "./modules/db.js";
import http from "./modules/http.js";
import socket from "./modules/socket.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const port = process.env.PORT ? Number(process.env.PORT) : 3172;

(async () => {
  await db.boot();

  http.boot(app());
  socket.boot();

  const files = readdirSync(join(__dirname, "runtime"));

  for (const file of files) {
    if (file.endsWith(".ts") || file.endsWith(".js"))
      await import(join(__dirname, "./runtime", file));
  }

  http().listen(port, () => console.log("Server running on port " + port));
})();
