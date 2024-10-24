import { Request, Response } from "express";
import authFile from "../../validators/auth-file.js";
import { createId } from "@paralleldrive/cuid2";
import { privateDecrypt, publicEncrypt } from "crypto";
import db from "../../modules/db.js";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";

export default async function verifyAuthFile(req: Request, res: Response) {
  const { cuid, privateKey } = await authFile.validate(
    req.body ? JSON.parse(req.body) : {}
  );

  const user = db().data.users.find((el) => el.cuid === cuid);

  if (!user) {
    res.sendStatus(401);
    return;
  }

  const publicKey = readFileSync(user.pubKeyPath).toString("utf-8");
  const validationString = createId();
  const validationEncrypted = publicEncrypt(
    publicKey,
    Buffer.from(validationString)
  );

  if (
    privateDecrypt(privateKey, validationEncrypted).toString("utf-8") !==
    validationString
  ) {
    res.sendStatus(401);
    return;
  }

  res.json({
    cuid,
    displayName: user.displayName,
    privateKey,
    token: jwt.sign({ cuid }, process.env.JWT_SECRET!),
  });
}
