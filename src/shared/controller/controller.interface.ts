import { Router } from "express"

interface Controller {
  initializeRoutes(): Router;
}

export default Controller