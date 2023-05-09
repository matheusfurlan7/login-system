import { Request, Response, NextFunction } from "express";

import { verify, TokenExpiredError } from 'jsonwebtoken';
import { AppError } from "../exception/AppError";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth)
    throw new AppError(404, 'jwt is missing');

  const [, token] = auth.split(' ');

  try {
    verify(token, process.env.JWT_SECRET!);   
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError(401, 'jwt expired');  
    } else {
      throw error;
    }
  }

  next();
}