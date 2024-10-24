import { Request, Response } from "express";
import searchUser from "../../validators/search-user.js";
import db from "../../modules/db.js";
import socket from "../../modules/socket.js";

export default async function findUser(req: Request, res: Response) {
  const { search = "" } = await searchUser.validate(req.query);

  const users = db().data.users.filter(
    (el) =>
      el.displayName.toLowerCase().includes(search.toLowerCase()) ||
      el.cuid.toLowerCase().includes(search.toLowerCase())
  );

  res.json(
    users.map((item) => ({
      ...item,
      isOnline: Boolean(
        socket.connectedUsers.find((el) => el.cuid === item.cuid)
      ),
    }))
  );
}
