import UserController from "../../modules/users/user.controller";
import ExceptionController from "./exception.controller";

export default [
  new UserController(),
  new ExceptionController()
]