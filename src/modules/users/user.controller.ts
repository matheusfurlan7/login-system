import { Request, Response, Router } from "express";
import Controller from "../../shared/controller/controller.interface";
import UserTable from "./user.table";

class UserController implements Controller {
  private router: Router = Router({ mergeParams: true });
  
  private getAll = async (req: Request, res: Response) => {
    const user = new UserTable();  
    res.status(200).send(await user.getAll());
  };

  public initializeRoutes(): Router {
    this.router.use('/users/', this.getAll);
    
    return this.router;
  }
}

export default UserController;