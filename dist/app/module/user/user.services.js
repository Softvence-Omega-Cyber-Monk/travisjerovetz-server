"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const generateJwt_1 = require("../../utils/generateJwt");
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp = async (data) => {
    if (!data.email || !data.password || !data.fullName) {
        throw new AppError_1.default(400, "fullName, email & password are required");
    }
    const existUser = await user_model_1.User.findOne({ email: data.email });
    if (existUser) {
        throw new AppError_1.default(400, `${data.email} already exists`);
    }
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const newUser = await user_model_1.User.create({
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        phone: data.phone
    });
    // remove password
    const { password, ...rest } = newUser.toObject();
    return rest;
};
const signIn = async (data) => {
    const { email, password } = data;
    const user = await user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(400, "Invalid email");
    }
    const isPasswordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(400, "Invalid password");
    }
    const tokens = await (0, generateJwt_1.generateJwt)(user);
    user.lastLogin = new Date();
    await user.save();
    const { password: pass, ...rest } = user.toObject();
    return {
        tokens: tokens,
        user: rest
    };
};
exports.UserServices = {
    signUp,
    signIn
};
//# sourceMappingURL=user.services.js.map