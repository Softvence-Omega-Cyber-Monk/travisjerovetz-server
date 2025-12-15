"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const protect_1 = require("../../middleware/protect");
const UserRouter = (0, express_1.Router)();
UserRouter.post("/signIn", user_controller_1.UserController.SingIn);
UserRouter.post("/signUp", user_controller_1.UserController.SignUp);
UserRouter.patch("/update/user/Profile/:id", (0, protect_1.checkAuths)(), user_controller_1.UserController.updateUserProfile);
UserRouter.get("/refreshToken", user_controller_1.UserController.getAccessTokenUseRefreshToken);
exports.default = UserRouter;
//# sourceMappingURL=user.router.js.map