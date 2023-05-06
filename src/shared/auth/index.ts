import { Request, Response, NextFunction } from "express";

import { verify } from 'jsonwebtoken';
import { AppError } from "../exception/AppError";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth)
    throw new AppError(404, 'JWT is missing');

  const [, token] = auth.split(' ');

  if (!process.env.JWT_SECRET)
    throw new AppError(505, "Secret to generate token wasn't informed.");

  const tokenDecoded = verify(token, process.env.JWT_SECRET);
  if (!tokenDecoded) 
    throw new Error('JWT invalid');

  next();
}