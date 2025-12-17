"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const support_model_1 = require("./support.model");
const sendResponse_1 = require("../../utils/sendResponse");
const createSupport = (0, catchAsync_1.default)(async (req, res, next) => {
    const email = req.authUser?.email;
    const data = req.body;
    const payload = {
        email: email,
        ...data
    };
    const createSupport = await support_model_1.Support.create(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Message sent to support",
        data: createSupport
    });
});
exports.supportController = {
    createSupport
};
//# sourceMappingURL=support.controller.js.map