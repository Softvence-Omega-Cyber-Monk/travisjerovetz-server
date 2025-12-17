import { Router } from "express";
import { courseController } from "./course.controller";
import { multerUpload } from "../../config/multer.config";
import { checkAuths } from "../../middleware/protect";
import { IRole } from "../user/user.interface";

const CourseRouter = Router();


CourseRouter.post("/create", checkAuths(IRole.ADMIN), multerUpload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "instructorProfile", maxCount: 1 }]), courseController.createCourse);
CourseRouter.get("/allCourse", checkAuths(IRole.ADMIN), courseController.getAllCourse);
CourseRouter.patch("/update/course", checkAuths(IRole.ADMIN), courseController.updateCourseInformation);
CourseRouter.get("/course/:courseId", checkAuths(IRole.ADMIN), courseController.getCourseWithProgress);
CourseRouter.delete("/delete/:courseId" , checkAuths() , courseController.deleteCourse);
CourseRouter.get("/get/coursebasicInfo/:courseId" , courseController.getSingleCourse);


export default CourseRouter;