import { Types } from "mongoose";
import AppError from "../../utils/AppError";
import { UserCourseProgress } from "../userCourseProgress/UserCourseProgress.model";
import { ICourse, IUpCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourse = async (payload: ICourse) => {
    const requiredFields = [
        "title",
        "description",
        "thumbnail",
        "category",
        "prices",
        "courseTag",
        "whatsUserLearn",
        "instructorName",
        "instructorTitle",
        "instructorDescription",
        "instructorProfile",
    ];

    for (const field of requiredFields) {
        if (!payload[field as keyof ICourse]) {
            throw new AppError(400, `Field "${field}" is required`);
        }
    }

    const course = await Course.create(payload);
    return course;
};

const updateCourse = async (courseId: Types.ObjectId, payload: Partial<IUpCourse>) => {
    const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { $set: payload },
        { new: true, runValidators: true}
    );

    return updatedCourse;
};


export const courseServices = {
    createCourse,
    updateCourse
}