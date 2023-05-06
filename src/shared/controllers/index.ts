import UserController from "../../modules/users/UserController";
import AuthController from "../../modules/auth/AuthController";

export default [
  new AuthController(),
  new UserController()
]