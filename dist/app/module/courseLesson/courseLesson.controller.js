"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessionController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const sendResponse_1 = require("../../utils/sendResponse");
const course_model_1 = require("../course/course.model");
const courseLesson_interface_1 = require("./courseLesson.interface");
const createLesson = (0, catchAsync_1.default)(async (req, res) => {
    const files = req.files;
    if (!req.body.data) {
        throw new AppError_1.default(400, "Missing form data.");
    }
    const parsedData = JSON.parse(req.body.data);
    const { courseId, moduleId, lessonName, article, duration } = parsedData;
    if (!courseId || !moduleId || !lessonName) {
        throw new AppError_1.default(400, "courseId, moduleId, lessonName are required");
    }
    // ✅ Enum mapping ব্যবহার করো
    const contentTypeMap = {
        video: courseLesson_interface_1.ILissonContentType.Video,
        image: courseLesson_interface_1.ILissonContentType.Image,
        audio: courseLesson_interface_1.ILissonContentType.Audio,
        pdf: courseLesson_interface_1.ILissonContentType.PDF,
        scorm: courseLesson_interface_1.ILissonContentType.SCORM,
    };
    let detectedType = null;
    let contentUrl = "";
    for (const field in contentTypeMap) {
        if (files?.[field]?.[0]?.path) {
            detectedType = field;
            contentUrl = files[field][0].path;
            break;
        }
    }
    if (!detectedType) {
        throw new AppError_1.default(400, "No valid content file uploaded.");
    }
    const newLesson = {
        lessonName,
        contentUrl,
        article,
        duration,
        isCompleted: false,
    };
    const course = await course_model_1.Course.findById(courseId);
    if (!course) {
        throw new AppError_1.default(404, "Course not found");
    }
    // ✅ Safe find module (find ব্যবহার করো)
    const module = course.modules.find((m) => m._id?.toString() === moduleId);
    if (!module) {
        throw new AppError_1.default(404, "Module not found");
    }
    // ✅ Lesson push করো
    module.lessons.push(newLesson);
    await course.save();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Lesson created and added to module successfully.",
        data: course,
    });
});
exports.LessionController = {
    createLesson
};
//# sourceMappingURL=courseLesson.controller.js.map