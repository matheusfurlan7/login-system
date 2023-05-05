import { IAppError } from "./IAppError";

class AppError extends Error implements IAppError {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message)
    this.status = status;
    this.message = message;
  }
}

export { AppError }