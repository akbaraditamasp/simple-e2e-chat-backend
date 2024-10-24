import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../../modules/db.js";

export default function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerToken = (req.header("authorization") || "").replace(
    "Bearer ",
    ""
  );

  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET!) as {
      cuid: string;
    };
    const user = db().data.users.find((el) => el.cuid === decoded.cuid);

    if (!user) {
      throw new Error();
    }

    (req as unknown as { user: typeof user }).user = user;
  } catch (e) {
    res.sendStatus(401);
    return;
  }

  next();
}
