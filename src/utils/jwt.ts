import jwt, { SignOptions } from "jsonwebtoken";
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const accessExpiresIn: SignOptions["expiresIn"] =
  (process.env.ACCESS_TOKEN_EXPIRES as SignOptions["expiresIn"]) || "15m";

const refreshExpiresIn: SignOptions["expiresIn"] =
  (process.env.REFRESH_TOKEN_EXPIRES as SignOptions["expiresIn"]) || "7d";

export interface JwtPayload {
  sub: string;
  userId: string;
  userName: string;
}
if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not set");
}

export function generateTokens(payload: JwtPayload) {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: accessExpiresIn,
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: refreshExpiresIn,
  });

  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}
export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
}
