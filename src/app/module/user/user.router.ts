import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuths } from "../../middleware/protect";

const UserRouter = Router();


UserRouter.post("/signIn", UserController.SingIn);
UserRouter.post("/signUp", UserController.SignUp);
UserRouter.post("/refreshToken", UserController.getAccessTokenUseRefreshToken)
UserRouter.get("/get/allUser", UserController.getAllUser);
UserRouter.get("/getMe" , checkAuths() , UserController.getMe);
UserRouter.delete("/delete/:userId" , checkAuths() , UserController.deleteUser);
UserRouter.patch("/update/user/Profile/:id", checkAuths(), UserController.updateUserProfile);


export default UserRouter;