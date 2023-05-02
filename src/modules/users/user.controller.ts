import { Request, Response, Router } from "express";
import IController from "../../shared/controller/controller.interface";
import UserTable from "./user.table";

class UserController implements IController {
  private router: Router = Router({ mergeParams: true });
  
  private getAll = async (req: Request, res: Response) => {
    const user = new UserTable();  
    res.status(200).send(await user.getAll());
  };

  private getId = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = new UserTable();  
    res.status(200).send(await user.load(parseInt(id)));
  };

  private create = async (req: Request, res: Response) => {
    const user = new UserTable();  
    res.status(200).send(await user.create(req.body));
  };

  private update = async (req: Request, res: Response) => {
    const user = new UserTable();  
    res.status(200).send(await user.update({
      id: parseInt(req.params.id),
      ...req.body
    }));
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