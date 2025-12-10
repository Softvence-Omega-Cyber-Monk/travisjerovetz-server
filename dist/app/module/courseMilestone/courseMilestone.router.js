"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_config_1 = require("../../config/multer.config");
const courseMilestone_controller_1 = require("./courseMilestone.controller");
const CourseModuleRouter = (0, express_1.Router)();
// Route for creating course with multiple file uploads (SCORM, video, audio, PDF, image)
CourseModuleRouter.post('/create', multer_config_1.multerUpload.fields([
    { name: 'scorm', maxCount: 1 }, // SCORM .zip ফাইলের জন্য
    { name: 'video', maxCount: 1 }, // ভিডিও ফাইলের জন্য
    { name: 'audio', maxCount: 1 }, // অডিও ফাইলের জন্য
    { name: 'pdf', maxCount: 1 }, // PDF ফাইলের জন্য
    { name: 'image', maxCount: 1 }, // চিত্র ফাইলের জন্য
]), courseMilestone_controller_1.milestoneContainer.createMilestone);
exports.default = CourseModuleRouter;
//# sourceMappingURL=courseMilestone.router.js.map