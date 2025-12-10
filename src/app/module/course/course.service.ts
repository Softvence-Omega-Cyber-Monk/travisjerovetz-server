import AppError from "../../utils/AppError";
import { ICourse } from "./course.interface";
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



export const courseServices = {
    createCourse
}