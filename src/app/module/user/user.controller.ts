import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";

const SignUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const result = await UserServices.signUp(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: `Well done, ${result.fullName}! Your registration was successful.`,
        data: result
    })

});


const SingIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.signIn(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: `Wellcome back, ${result.user.fullName}! You have successfully signed in.`,
        data: result
    })

});


export const UserController = {
    SignUp,
    SingIn
}