import { Router } from "express";
import { userCourseProgresssController } from "./UserCourseProgress.controller";

const userCourseProgressRouter = Router();

userCourseProgressRouter.post("/create" , userCourseProgresssController.createProgress);
userCourseProgressRouter.get("/getCourseProgress/:courseId/:userId" , userCourseProgresssController.getProgressSingleCourse);
userCourseProgressRouter.patch("/complite/lession/:courseId/:lessonId/:userId" , userCourseProgresssController.compliteLession);

export default userCourseProgressRouter;