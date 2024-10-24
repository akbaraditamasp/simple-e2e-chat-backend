import { createId } from "@paralleldrive/cuid2";
import { generateKeyPairSync } from "crypto";
import { Request, Response } from "express";
import register from "../../validators/register.js";
import db from "../../modules/db.js";
import { resolve } from "path";
import { writeFileSync } from "fs";
import jwt from "jsonwebtoken";

export default async function getStarted(req: Request, res: Response) {
  const { displayName } = await register.validate(req.body);

  const cuid = createId();

  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  const pubKeyPath = resolve("pub_keys", `${cuid}`);
  await db().update(({ users }) =>
    users.push({
      cuid,
      displayName,
      pubKeyPath: pubKeyPath,
    })
  );

  writeFileSync(pubKeyPath, publicKey);

  res.json({
    cuid,
    displayName,
    privateKey,
    token: jwt.sign({ cuid }, process.env.JWT_SECRET!),
  });
}
