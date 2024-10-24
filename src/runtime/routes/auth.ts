import { Router } from "express";
import getStarted from "../../handlers/auth/get-started.js";
import bodyParser from "body-parser";
import verifyAuthFile from "../../handlers/auth/verify-auth-file.js";
import checkToken from "../../handlers/auth/check-token.js";

const auth = Router();

auth.post("/verify", bodyParser.raw({ limit: "10mb" }), verifyAuthFile);
auth.post("/", getStarted);
auth.get("/", checkToken, (req, res) => {
  res.json((req as any).user);
});

export default auth;
