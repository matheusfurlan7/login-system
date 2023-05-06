import { NextFunction, Request, Response, Router } from "express";

import { IBaseController } from "../../shared/controllers/IBaseController";
import AutenticationUserUseCase from "./useCase/AutenticationUserUseCase";

class AuthController implements IBaseController {
  private router: Router = Router({ mergeParams: true });

  private auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersUseCase = new AutenticationUserUseCase();
      const auth = await usersUseCase.execute({
        ...req.body
      });

      res.status(200).send(auth);
    } catch (error) {
      next(error);
    }
  };

  public initializeRoutes(): Router {
    this.router.post('/auth', this.auth);

    return this.router;
  }
}

export default AuthController;