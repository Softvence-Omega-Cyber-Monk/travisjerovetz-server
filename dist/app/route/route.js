"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRoute = void 0;
const user_router_1 = __importDefault(require("../module/user/user.router"));
const course_router_1 = __importDefault(require("../module/course/course.router"));
const courseMilestone_router_1 = __importDefault(require("../module/courseMilestone/courseMilestone.router"));
const courseLesson_router_1 = __importDefault(require("../module/courseLesson/courseLesson.router"));
const UserCourseProgress_router_1 = __importDefault(require("../module/userCourseProgress/UserCourseProgress.router"));
const enroll_router_1 = __importDefault(require("../module/CourseEnroll/enroll.router"));
const analytics_route_1 = __importDefault(require("../module/analytics/analytics.route"));
exports.moduleRoute = [
    {
        path: "/user",
        routes: user_router_1.default
    },
    {
        path: "/course",
        routes: course_router_1.default
    },
    {
        path: "/module",
        routes: courseMilestone_router_1.default
    },
    {
        path: "/lession",
        routes: courseLesson_router_1.default
    },
    {
        path: "/progress",
        routes: UserCourseProgress_router_1.default
    },
    {
        path: "/enrolCourse",
        routes: enroll_router_1.default
    },
    {
        path: "/analytics",
        routes: analytics_route_1.default
    }
];
//# sourceMappingURL=route.js.map