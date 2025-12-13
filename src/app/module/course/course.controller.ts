import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { courseServices } from "./course.service";
import AppError from "../../utils/AppError";
import { Course } from "./course.model";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { UserCourseProgress } from "../userCourseProgress/UserCourseProgress.model";


const createCourse = catchAsync(async (req, res, next: NextFunction) => {

    const bodyData = req.body.data ? JSON.parse(req.body.data) : {};

    const files = req.files as {
        thumbnail?: Express.Multer.File[];
        instructorProfile?: Express.Multer.File[];
    };

    const payload = {
        ...bodyData,
        thumbnail: files?.thumbnail?.[0]?.path || "",
        instructorProfile: files?.instructorProfile?.[0]?.path || "",
    };

    const result = await courseServices.createCourse(payload);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Course created successfully",
        data: result,
    });
});

const getCourseWithProgress = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { userId, courseId } = req.params;

    if (!userId || !courseId) {
        throw new AppError(400, "userId & courseId are required");
    }

    const course = await Course.findById(courseId);
    if (!course) throw new AppError(404, "Course not found");

    const progress = await UserCourseProgress.findOne({ userId, courseId });
    if (!progress) throw new AppError(404, "User progress not found");

    // Make completed lesson IDs string array
    progress.modules.forEach(m => {
        m.completedLessons = m.completedLessons.map(l => l.toString()) as any;
    });

    // ----------------------------
    // MODULE WISE PROGRESS
    // ----------------------------

    const modules = course.modules
        .filter((module) => module && module._id)
        .map((module) => {
            const moduleId = module._id!.toString();

            const userModule = progress.modules.find(
                (m) => m.moduleId.toString() === moduleId
            );

            const totalLessons = module.lessons?.length || 0;
            const completedLessons = userModule?.completedLessons.length || 0;
            const pendingLessons = totalLessons - completedLessons;

            const moduleProgress =
                totalLessons > 0
                    ? Math.round((completedLessons / totalLessons) * 100)
                    : 0;

            // MODULE DURATION
            const moduleDuration = module.lessons.reduce(
                (acc, lesson) => acc + (lesson.duration || 0),
                0
            );

            // LESSON COMPLETION FLAG
            const lessonsWithStatus = module.lessons.map((lesson) => {
                const lessonId = lesson._id?.toString() || "";

                const lessonObj =
                    typeof (lesson as any).toObject === "function"
                        ? (lesson as any).toObject()
                        : (lesson as any)._doc;

                // Convert completed lessons to string array
                const completedLessonIds = (userModule?.completedLessons || []).map(
                    (id) => id.toString()
                );

                return {
                    ...lessonObj,
                    completedLesson: completedLessonIds.includes(lessonId),
                };
            });

            return {
                moduleId: module._id,
                moduleName: module.moduleName,
                totalLessons,
                completedLessons,
                pendingLessons,
                progress: moduleProgress,
                duration: moduleDuration, // <-- add module duration
                lessons: lessonsWithStatus,
            };
        });

    // ----------------------------
    // COURSE SUMMARY PROGRESS
    // ----------------------------

    const totalLessonsInCourse = modules.reduce(
        (acc, m) => acc + m.totalLessons,
        0
    );

    const completedLessonsInCourse = modules.reduce(
        (acc, m) => acc + m.completedLessons,
        0
    );

    const pendingLessonsInCourse = totalLessonsInCourse - completedLessonsInCourse;

    const courseProgress =
        totalLessonsInCourse > 0
            ? Math.round((completedLessonsInCourse / totalLessonsInCourse) * 100)
            : 0;

    // CALCULATE TOTAL COURSE DURATION
    const totalCourseDuration = modules.reduce(
        (acc, m) => acc + (m.duration || 0),
        0
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Course finded success",
        data: {
            courseInfo: {
                ...course.toObject(),
                modules,
                totalDuration: totalCourseDuration // <-- add total course duration
            },
            courseSummary: {
                totalLessons: totalLessonsInCourse,
                completedLessons: completedLessonsInCourse,
                pendingLessons: pendingLessonsInCourse,
                progress: courseProgress,
                totalDuration: totalCourseDuration // <-- add total duration summary
            },
        }
    })
});

const getAllCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // 1. Start query with only Published courses
    const baseQuery = Course.find({ courseStatus: "Published" });

    // 2. Create QueryBuilder instance
    const queryBuilder = new QueryBuilder(baseQuery, req.query as Record<string, string>);

    // 3. Apply filter, search, sort, select, paginate
    const coursesQuery = queryBuilder
        .filter() // any filters like category, price, etc.
        .search(["title", "description", "courseTag", "category"]) // searchable fields
        .sort()   // default: -createdAt
        .select() // select specific fields if requested
        .paginate() // apply pagination
        .build();

    // 4. Execute query
    const courses = await coursesQuery;

    // 5. Get pagination/meta info based on filtered & searched query
    const meta = await queryBuilder.getMeta();

    // 6. Send response
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Courses fetched successfully",
        data: courses,
        meta,
    });
});

export const courseController = {
    createCourse,
    getCourseWithProgress,
    getAllCourse
}