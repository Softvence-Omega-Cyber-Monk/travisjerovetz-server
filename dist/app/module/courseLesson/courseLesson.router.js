"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseLesson_controller_1 = require("./courseLesson.controller");
const multer_config_1 = require("../../config/multer.config");
const LessionRouter = (0, express_1.Router)();
LessionRouter.post("/create", multer_config_1.multerUpload.fields([
    { name: 'scorm', maxCount: 1 }, // SCORM .zip ফাইলের জন্য
    { name: 'video', maxCount: 1 }, // ভিডিও ফাইলের জন্য
    { name: 'audio', maxCount: 1 }, // অডিও ফাইলের জন্য
    { name: 'pdf', maxCount: 1 }, // PDF ফাইলের জন্য
    { name: 'image', maxCount: 1 }, // চিত্র ফাইলের জন্য
]), courseLesson_controller_1.LessionController.createLesson);
exports.default = LessionRouter;
//# sourceMappingURL=courseLesson.router.js.map