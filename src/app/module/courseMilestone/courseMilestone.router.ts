import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { milestoneContainer } from "./courseMilestone.controller";
import { checkAuths } from "../../middleware/protect";


const CourseModuleRouter = Router();

// Route for creating course with multiple file uploads (SCORM, video, audio, PDF, image)
CourseModuleRouter.post('/create', multerUpload.fields([
    { name: 'scorm', maxCount: 1 },  // SCORM .zip ফাইলের জন্য
    { name: 'video', maxCount: 1 },  // ভিডিও ফাইলের জন্য
    { name: 'audio', maxCount: 1 },  // অডিও ফাইলের জন্য
    { name: 'pdf', maxCount: 1 },    // PDF ফাইলের জন্য
    { name: 'image', maxCount: 1 },  // চিত্র ফাইলের জন্য
]), milestoneContainer.createMilestone);

CourseModuleRouter.patch("/update/moduleName", checkAuths(), milestoneContainer.updateModuleName);
CourseModuleRouter.delete("/delete", checkAuths(), milestoneContainer.deleteModule);

export default CourseModuleRouter;


