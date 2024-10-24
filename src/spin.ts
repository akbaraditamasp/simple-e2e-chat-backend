import { readdirSync } from "fs";
import { resolve } from "path";
import http from "./modules/http.js";
import app from "./modules/app.js";
import socket from "./modules/socket.js";
import db from "./modules/db.js";
import "dotenv/config";

const port = process.env.PORT ? Number(process.env.PORT) : 3172;

(async () => {
  await db.boot();

  http.boot(app());
  socket.boot();

  const files = readdirSync(resolve("src", "runtime"));

  for (const file of files) {
    if (file.endsWith(".ts")) await import(resolve("src", "runtime", file));
  }

  http().listen(port, () => console.log("Server running on port " + port));
})();
