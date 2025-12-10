import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { courseServices } from "./course.service";
import AppError from "../../utils/AppError";
import { Course } from "./course.model";
import { QueryBuilder } from "../../utils/QueryBuilder";


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


const getCourseProgress = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    if (!courseId) {
        throw new AppError(400, "Course ID is required");
    }

    // 1. Course find kora
    const course = await Course.findById(courseId);

    if (!course) {
        throw new AppError(404, "Course not found");
    }

    let totalLessons = 0;
    let totalCompletedLessons = 0;
    let totalCourseDuration = 0;
    const totalModules = course.modules.length;

    // 2. Prottek module er progress calculate kora
    const modulesWithProgress = course.modules.map(module => {
        const moduleTotal = module.lessons.length;
        const moduleCompleted = module.lessons.filter(lesson => lesson.isCompleted).length;


        // Module duration
        const moduleDuration = module.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);

        const moduleProgress = moduleTotal === 0 ? 0 : (moduleCompleted / moduleTotal) * 100;

        totalLessons += moduleTotal;
        totalCompletedLessons += moduleCompleted;
        totalCourseDuration += moduleDuration;

        // Plain object return kora
        return {
            _id: module._id,
            moduleName: module.moduleName,
            lessons: module.lessons,
            totalLessons: moduleTotal,
            completedLessons: moduleCompleted,
            moduleProgress: parseFloat(moduleProgress.toFixed(2)),
            moduleDuration,
        };
    });

    // 3. Puro course progress
    const courseProgress = totalLessons === 0 ? 0 : (totalCompletedLessons / totalLessons) * 100;

    // 4. Full course data return kora
    res.status(200).json({
        status: "success",
        data: {
            ...course.toObject(),
            totalModules,
            totalLessons,
            completedLessons: totalCompletedLessons,
            totalCourseDuration, // puro course er duration
            courseProgress: parseFloat(courseProgress.toFixed(2)),
            modules: modulesWithProgress,
        },
    });
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
    getCourseProgress,
    getAllCourse
}