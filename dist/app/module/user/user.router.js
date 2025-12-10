"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const UserRouter = (0, express_1.Router)();
UserRouter.post("/signIn", user_controller_1.UserController.SingIn);
UserRouter.post("/signUp", user_controller_1.UserController.SignUp);
exports.default = UserRouter;
//# sourceMappingURL=user.router.js.map