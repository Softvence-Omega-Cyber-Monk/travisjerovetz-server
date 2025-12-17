"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgesController = void 0;
const complited_course_model_1 = require("../ComplitedCourse/complited.course.model");
const mongoose_1 = require("mongoose");
const getUserBadges = async (req, res) => {
    try {
        const userId = req.authUser?.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID not provided", });
        }
        const badges = await complited_course_model_1.ComplitedCourse.aggregate([
            // 1️⃣ Match user
            {
                $match: {
                    userId: new mongoose_1.Types.ObjectId(userId),
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get user badges",
            error,
        });
    }
};
exports.badgesController = {
    getUserBadges
};
//# sourceMappingURL=badges.controller.js.map