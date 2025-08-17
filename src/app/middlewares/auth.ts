import type { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../../utils/jwtHelper.js";
import config from "../../config/index.js";
import ApiError from "../errors/apiError.js";
import HttpStatus from "http-status";

const auth = (...roles: string[]) => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelper.verifyToken(token, config.jwt.jwt_secret);
      req.user = verifiedUser;
      // console.log("Verified user:", verifiedUser);

      if (!roles.includes(verifiedUser.role)) {
        throw new ApiError(HttpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      next(error);
    }
  };
};

export default auth;
