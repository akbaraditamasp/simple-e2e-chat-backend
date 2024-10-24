import { Request, Response } from "express";
import chat from "../../validators/chat.js";
import db from "../../modules/db.js";
import socket from "../../modules/socket.js";

export default async function send(req: Request, res: Response) {
  const data = await chat.validate(req.body);
  const user = db().data.users.find((el) => el.cuid === req.params.cuid);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  const conn = socket.connectedUsers.find((el) => el.cuid === user.cuid);

  if (conn) {
    conn.socket.emit("chat", data);
  } else {
    db().data.pending.push({ ...data, cuid: user.cuid });
    await db().write();
  }

  res.sendStatus(200);
}
