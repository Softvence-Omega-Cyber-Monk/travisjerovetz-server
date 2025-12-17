import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../utils/AppError";
import { User } from "./user.model";
import { createAccessTokenUseRefreshToken } from "../../utils/createAccessTokenUseRefreshToken";

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


const updateUserProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    if (!userId) {
        return next(new AppError(400, "User ID is required"));
    }

    const payload = req.body;

    const updateData: Record<string, any> = {};

    // Only valid value update
    for (const key in payload) {
        const value = payload[key];

        if (value !== null && value !== undefined) {
            if (typeof value === "string" && value.trim() === "") continue;
            updateData[key] = value;
        }
    }

    // Never update these
    delete updateData.password;
    delete updateData.lastLogin;

    if (Object.keys(updateData).length === 0) {
        return next(new AppError(400, "No valid fields to update"));
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select("-password -lastLogin");

    if (!updatedUser) {
        return next(new AppError(404, "User not found"));
    }

    res.status(200).json({
        status: "success",
        data: updatedUser,
    });
}
);


const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await UserServices.getAllUser(query as Record<string, string>);


    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "All User Retrived Successfully",
        data: result.data,
        meta: result.meta
    })

})


const getAccessTokenUseRefreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.headers?.authorization;

    const result = await createAccessTokenUseRefreshToken(refreshToken as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Token refreshed successfully",
        data: result
    })
});

export const UserController = {
    SignUp,
    SingIn,
    updateUserProfile,
    getAccessTokenUseRefreshToken,
    getAllUser
}