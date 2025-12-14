"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const analytics_services_1 = require("./analytics.services");
const sendResponse_1 = require("../../utils/sendResponse");
const mongoose_1 = require("mongoose");
const adminAnalytics = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await analytics_services_1.analyticsServices.adminAnalytics();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Admin Dashboard analyticl data retrived successfully",
        data: result
    });
});
const userAnalyticsData = (0, catchAsync_1.default)(async (req, res, next) => {
    // const userId = req.authUser?._id;
    const userId = req.params?.userId;
    const result = await analytics_services_1.analyticsServices.userAnalyticsData(new mongoose_1.Types.ObjectId(userId));
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User analytics data retrived successfully",
        data: result
    });
});
exports.analyticsController = {
    adminAnalytics,
    userAnalyticsData
};
//# sourceMappingURL=analytics.controller.js.map