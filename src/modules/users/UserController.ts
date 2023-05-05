import { NextFunction, Request, Response, Router } from "express";

import { IController } from "../../shared/controllers/IController";
import { IUserDto } from "./Dto/IUserDto";
import { IUserResponseDto } from "./Dto/IUserResponseDto";

import GetAllUserUseCase from './UseCase/GetAllUserUseCase';
import GetIdUserUseCase from "./UseCase/GetIdUserUseCase";
import CreateUserUseCase from "./UseCase/CreateUserUseCase";
import UpdateUserUseCase from "./UseCase/UpdateUserUseCase";

class UserController implements IController {
  private router: Router = Router({ mergeParams: true });

  private serializador(user: IUserDto | IUserDto[]): IUserResponseDto | IUserResponseDto[] {
    if (Array.isArray(user)) {
      return user.map(({ password, ...rest }) => {
        return rest;
      });
    };

    const userResponse: IUserResponseDto = user;
    delete userResponse?.password;
    return userResponse;
  }

  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersUseCase = new GetAllUserUseCase();
      const records = await usersUseCase.execute();
      const usersResponse = this.serializador(records);
      res.status(200).send(usersResponse);
    } catch (error) {
      next(error);
    }
  };

  private getId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const usersUseCase = new GetIdUserUseCase();
      const record = await usersUseCase.execute(id);
      const userResponse = this.serializador(record);
      res.status(200).send(userResponse);
    } catch (error) {
      next(error);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersUseCase = new CreateUserUseCase();
      const record = await usersUseCase.execute({
        name: req.body.name,
        birthDate: new Date(req.body.birthDate),
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
      });

      const userResponse = this.serializador(record);
      res.status(200).send(userResponse);
    } catch (error) {
      next(error);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const usersUseCase = new UpdateUserUseCase();
      const record = await usersUseCase.execute({
        id: id,
        name: req.body.name,
        birthDate: new Date(req.body.birthDate),
        email: req.body.email
      });

      const userResponse = this.serializador(record);
      res.status(200).send(userResponse);
    } catch (error) {
      next(error);
    }
  };

  public initializeRoutes(): Router {
    this.router.get('/users/', this.getAll);
    this.router.get('/users/:id', this.getId);
    this.router.post('/users/', this.create);
    this.router.put('/users/:id', this.update);

    return this.router;
  }
}

export default UserController;