import { NextFunction, Request, Response, Router } from "express";
import Controller from "./controller.interface";

class ExceptionController implements Controller {
  private router: Router = Router({ mergeParams: true });

  public initializeRoutes(): Router {
    this.router.use('/', (req, res) => {
      res.sendStatus(404);
    });

    this.router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      const message = error.message || `Message not defined!`;
      const statusCode = 500;
    
      res.status(statusCode).send({
        status: statusCode,
        error: message
      });
    });

    return this.router;
  }
}

export default ExceptionController;