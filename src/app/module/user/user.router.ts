import { Router } from "express";
import { UserController } from "./user.controller";

const UserRouter = Router();


UserRouter.post("/signIn", UserController.SingIn);
UserRouter.post("/signUp", UserController.SignUp);


export default UserRouter;