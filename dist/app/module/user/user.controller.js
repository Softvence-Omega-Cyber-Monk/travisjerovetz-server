"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_services_1 = require("./user.services");
const sendResponse_1 = require("../../utils/sendResponse");
const SignUp = (0, catchAsync_1.default)(async (req, res, next) => {
    console.log(req.body);
    const result = await user_services_1.UserServices.signUp(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: `Well done, ${result.fullName}! Your registration was successful.`,
        data: result
    });
});
const SingIn = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await user_services_1.UserServices.signIn(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: `Wellcome back, ${result.user.fullName}! You have successfully signed in.`,
        data: result
    });
});
exports.UserController = {
    SignUp,
    SingIn
};
//# sourceMappingURL=user.controller.js.map