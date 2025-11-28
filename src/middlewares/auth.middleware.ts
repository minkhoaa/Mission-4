import { NextFunction, Request, Response } from "express";
import authrouter from "../routes/auth.router";
import { verify } from "crypto";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: { sub: string; userId: string; userName: string };
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ message: "Missing token" });
  const token = auth.substring("Bearer ".length);
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
