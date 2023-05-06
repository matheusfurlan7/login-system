import { Router } from "express"

interface IBaseController {
  initializeRoutes(): Router;
}

export { IBaseController };