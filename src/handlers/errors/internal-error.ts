import { NextFunction, Request, Response } from "express";

export default function internalError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);
  res.sendStatus(500);
}
