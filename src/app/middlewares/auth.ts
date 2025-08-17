import type { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../../utils/jwtHelper.js";
import config from "../../config/index.js";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are not authorized!");
      }

      const verifiedUser = jwtHelper.verifyToken(token, config.jwt.jwt_secret);
      console.log("Verified user:", verifiedUser);

      if (!roles.includes(verifiedUser.role)) {
        throw new Error("You are not authorized!");
      }
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      next(error);
    }
  };
};

export default auth;
