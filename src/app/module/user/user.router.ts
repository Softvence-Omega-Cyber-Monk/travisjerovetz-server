import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuths } from "../../middleware/protect";

const UserRouter = Router();


UserRouter.post("/signIn", UserController.SingIn);
UserRouter.post("/signUp", UserController.SignUp);
UserRouter.get("/refreshToken", UserController.getAccessTokenUseRefreshToken)
UserRouter.get("/get/allUser", UserController.getAllUser);
UserRouter.patch("/update/user/Profile/:id", checkAuths(), UserController.updateUserProfile);


export default UserRouter;