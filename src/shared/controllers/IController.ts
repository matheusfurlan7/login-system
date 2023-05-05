import { Router } from "express"

interface IController {
  initializeRoutes(): Router;
}

export { IController };