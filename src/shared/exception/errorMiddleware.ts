import { NextFunction, Request, Response, Router } from "express";
import { AppError } from "./AppError";

export function errorMiddleware(error: Error | AppError, req: Request, res: Response, next: NextFunction) {
  if (error instanceof AppError) {
    const statusCode = error.status;
    const message = error.message;
    return res.status(statusCode).send({
      status: statusCode,
      error: message
    });
  }

  const message = error.message;
  return res.status(500).send({
    status: 500,
    error: message
  });
};