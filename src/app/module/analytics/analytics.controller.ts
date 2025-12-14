import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { analyticsServices } from "./analytics.services";
import { sendResponse } from "../../utils/sendResponse";
import { Types } from "mongoose";

const adminAnalytics = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await analyticsServices.adminAnalytics();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Admin Dashboard analyticl data retrived successfully",
        data: result
    })

});


const userAnalyticsData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const userId = req.authUser?._id;
    const userId = req.params?.userId

    const result = await analyticsServices.userAnalyticsData(new Types.ObjectId(userId));


    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User analytics data retrived successfully",
        data: result
    })
})

export const analyticsController = {
    adminAnalytics,
    userAnalyticsData
}