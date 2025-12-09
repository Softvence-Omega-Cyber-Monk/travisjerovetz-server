import { Router } from "express"
import UserRouter from "../module/user/user.router";
import CourseRouter from "../module/course/course.router";



export const moduleRoute = [
    {
        path: "/user",
        routes: UserRouter
    },
    {
        path: "/course",
        routes: CourseRouter
    }
];

