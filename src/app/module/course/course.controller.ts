import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {

    const bodyData = req.body.data ? JSON.parse(req.body.data) : {};
    
    const files = req.files as {
        thumbnail?: Express.Multer.File[];
        instructorProfile?: Express.Multer.File[];
    };

    const payload = {
        ...bodyData,
        thumbnail: files?.thumbnail?.[0]?.path || "",
        instructorProfile: files?.instructorProfile?.[0]?.path || "",
    };

    const result = await courseServices.createCourse(payload);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Course created successfully",
        data: result,
    });
});



export const courseController = {
    createCourse
}