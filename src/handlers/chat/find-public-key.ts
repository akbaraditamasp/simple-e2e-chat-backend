import { Request, Response } from "express";
import db from "../../modules/db.js";

export default function findPublicKey(req: Request, res: Response) {
  const user = db().data.users.find((el) => el.cuid === req.params.cuid);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.sendFile(user.pubKeyPath);
}
