import { Router } from "express";
import { courseController } from "./course.controller";
import { multerUpload } from "../../config/multer.config";

const CourseRouter = Router();


CourseRouter.post("/create", multerUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "instructorProfile", maxCount: 1 }]),
    courseController.createCourse);



export default CourseRouter;