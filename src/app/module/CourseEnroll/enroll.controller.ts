import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { enrollServices } from "./enroll.services";
import { Types } from "mongoose";
import AppError from "../../utils/AppError";
import { sendResponse } from "../../utils/sendResponse";

const enrollCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId, courseId, courseName } = req.body;

    if (!userId || !courseId || !courseName) {
        throw new AppError(400, "UserId , CourseID & CourseName must be required");
    }

    const result = await enrollServices.enrollCourse({
        userId: new Types.ObjectId(userId),
        courseId: new Types.ObjectId(courseId),
        courseName: courseName
    });

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: `${courseName} enrollment successfully`,
        data: result
    })

});



export const enrollController = {
    enrollCourse
}