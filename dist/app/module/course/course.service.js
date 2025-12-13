"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const course_model_1 = require("./course.model");
const createCourse = async (payload) => {
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
        if (!payload[field]) {
            throw new AppError_1.default(400, `Field "${field}" is required`);
        }
    }
    const course = await course_model_1.Course.create(payload);
    return course;
};
const updateCourse = async (courseId, payload) => {
    const updatedCourse = await course_model_1.Course.findByIdAndUpdate(courseId, { $set: payload }, { new: true, runValidators: true });
    return updatedCourse;
};
exports.courseServices = {
    createCourse,
    updateCourse
};
//# sourceMappingURL=course.service.js.map