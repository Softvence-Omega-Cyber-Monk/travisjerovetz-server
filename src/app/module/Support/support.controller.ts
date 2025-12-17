import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { Support } from "./support.model";
import { sendResponse } from "../../utils/sendResponse";

const createSupport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const email = req.authUser?.email;

    const data = req.body;


    const payload = {
        email: email,
        ...data
    };


    const createSupport = await Support.create(payload);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Message sent to support",
        data: createSupport
    });
});


export const supportController = {
    createSupport
};