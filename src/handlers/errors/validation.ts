import { NextFunction, Request, Response } from "express";
import { errors } from "@vinejs/vine";

export default function validation(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof errors.E_VALIDATION_ERROR) {
    res.status(422).json(err.messages);
    return;
  }

  next(err);
}
