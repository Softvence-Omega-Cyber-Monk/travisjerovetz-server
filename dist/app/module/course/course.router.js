"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
const multer_config_1 = require("../../config/multer.config");
const CourseRouter = (0, express_1.Router)();
CourseRouter.post("/create", multer_config_1.multerUpload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "instructorProfile", maxCount: 1 }]), course_controller_1.courseController.createCourse);
CourseRouter.get("/allCourse", course_controller_1.courseController.getAllCourse);
CourseRouter.get("/course/:courseId/:userId", course_controller_1.courseController.getCourseWithProgress);
exports.default = CourseRouter;
//# sourceMappingURL=course.router.js.map