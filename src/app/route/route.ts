import UserRouter from "../module/user/user.router";
import CourseRouter from "../module/course/course.router";
import CourseModuleRouter from "../module/courseMilestone/courseMilestone.router";
import LessionRouter from "../module/courseLesson/courseLesson.router";
import userCourseProgressRouter from "../module/userCourseProgress/UserCourseProgress.router";



export const moduleRoute = [
    {
        path: "/user",
        routes: UserRouter
    },
    {
        path: "/course",
        routes: CourseRouter
    },
    
    {
        path: "/module",
        routes: CourseModuleRouter
    },
    {
        path: "/lession",
        routes: LessionRouter
    },
    {
        path: "/progress",
        routes: userCourseProgressRouter
    },

];

