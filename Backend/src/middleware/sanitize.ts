import type { NextFunction, Request, Response } from "express";
import { clean } from "../utils/sanitize.js";

export function sanitizeBody(req: Request, _res: Response, next: NextFunction) {
  req.body = clean(req.body);
  next();
}
