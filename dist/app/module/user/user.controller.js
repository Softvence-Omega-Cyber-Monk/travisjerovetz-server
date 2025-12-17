"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_services_1 = require("./user.services");
const sendResponse_1 = require("../../utils/sendResponse");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_model_1 = require("./user.model");
const createAccessTokenUseRefreshToken_1 = require("../../utils/createAccessTokenUseRefreshToken");
const SignUp = (0, catchAsync_1.default)(async (req, res, next) => {
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
const updateUserProfile = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.params.id;
    if (!userId) {
        return next(new AppError_1.default(400, "User ID is required"));
    }
    const payload = req.body;
    const updateData = {};
    // Only valid value update
    for (const key in payload) {
        const value = payload[key];
        if (value !== null && value !== undefined) {
            if (typeof value === "string" && value.trim() === "")
                continue;
            updateData[key] = value;
        }
    }
    // Never update these
    delete updateData.password;
    delete updateData.lastLogin;
    if (Object.keys(updateData).length === 0) {
        return next(new AppError_1.default(400, "No valid fields to update"));
    }
    const updatedUser = await user_model_1.User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true }).select("-password -lastLogin");
    if (!updatedUser) {
        return next(new AppError_1.default(404, "User not found"));
    }
    res.status(200).json({
        status: "success",
        data: updatedUser,
    });
});
const getAllUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const query = req.query;
    const result = await user_services_1.UserServices.getAllUser(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "All User Retrived Successfully",
        data: result.data,
        meta: result.meta
    });
});
const getMe = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser.userId;
    const result = await user_model_1.User.findById(userId);
    if (!result)
        throw new AppError_1.default(404, "User Not found");
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User Profile retrived successfully",
        data: result
    });
});
const getAccessTokenUseRefreshToken = (0, catchAsync_1.default)(async (req, res, next) => {
    const refreshToken = req.headers?.authorization;
    const result = await (0, createAccessTokenUseRefreshToken_1.createAccessTokenUseRefreshToken)(refreshToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Token refreshed successfully",
        data: result
    });
});
const deleteUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.params.userId;
    const result = await user_model_1.User.findByIdAndDelete(userId);
    if (!result)
        throw new AppError_1.default(404, "User not found");
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User Deleted successfully",
        data: null
    });
});
exports.UserController = {
    SignUp,
    SingIn,
    updateUserProfile,
    getAccessTokenUseRefreshToken,
    getAllUser,
    getMe,
    deleteUser
};
//# sourceMappingURL=user.controller.js.map