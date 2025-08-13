import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";

const generateToken = (payload: any, secret: Secret, expiresIn: any) => {
  return jwt.sign(payload, secret, {
    expiresIn,
    algorithm: "HS256",
  });
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = {
  generateToken,
  verifyToken,
};
