import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ComplitedCourse } from "../ComplitedCourse/complited.course.model";
import { Types } from "mongoose";


const getUserBadges = async (req: Request, res: Response) => {
    try {
        const userId = req.authUser?.userId;

        if (!userId) { return res.status(400).json({ success: false, message: "User ID not provided", }); }

        const badges = await ComplitedCourse.aggregate([
            // 1️⃣ Match user
            {
                $match: {
                    userId: new Types.ObjectId(userId),
                },
            },

            // 2️⃣ Join with Badge collection
            {
                $lookup: {
                    from: "badges",
                    localField: "badgesId",
                    foreignField: "_id",
                    as: "badgeDetails",
                },
            },

            // 3️⃣ Array → Object
            {
                $unwind: "$badgeDetails",
            },

            // 4️⃣ Only needed fields
            {
                $project: {
                    _id: 0,
                    courseCompliteDate: 1,
                    badge: "$badgeDetails",
                },
            },
        ]);

        res.status(200).json({
            success: true,
            message: "User badges retrieved successfully",
            data: badges,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get user badges",
            error,
        });
    }
};



export const badgesController = {
    getUserBadges
}