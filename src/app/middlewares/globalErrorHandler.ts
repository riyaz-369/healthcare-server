import type { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Global Error Handler:", error);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong",
    error: error instanceof Error ? error.message : "Unknown error",
  });
};

export default globalErrorHandler;
