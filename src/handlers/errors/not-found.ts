import { Request, Response } from "express";

export default function notFound(_req: Request, res: Response) {
  res.sendStatus(404);
}
