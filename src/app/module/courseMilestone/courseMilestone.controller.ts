import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ILissonContentType } from "../courseLesson/courseLesson.interface";
import AppError from "../../utils/AppError";
import { sendResponse } from "../../utils/sendResponse";
import { ILesson, IModule } from "../course/course.interface";
import { Course } from "../course/course.model";


// const createMilestone = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     // TypeScript fix: force type cast as object with File[] values
//     const files = req.files as { [fieldname: string]: Express.Multer.File[] };

//     const scormUrl = files?.scorm?.[0]?.path || "";
//     const videoUrl = files?.video?.[0]?.path || "";
//     const audioUrl = files?.audio?.[0]?.path || "";
//     const pdfUrl = files?.pdf?.[0]?.path || "";
//     const image = files?.image?.[0]?.path || "";






//     sendResponse(res, {
//         success: true,
//         statusCode: 200,
//         message: "Module Created Success",
//         data: {
//             scormUrl,
//             videoUrl,
//             audioUrl,
//             pdfUrl,
//             image
//         }
//     });

// });




const createMilestone = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (!req.body.data) {
    throw new AppError(400, "Missing form data.");
  }

  const parsedData = JSON.parse(req.body.data);
  const { courseId, moduleName, lessonName, article } = parsedData;

  if (!courseId || !moduleName || !lessonName) {
    throw new AppError(400, "courseId, moduleName, lessonName are required");
  }

  // ✅ Enum mapping ব্যবহার করো
  const contentTypeMap: Record<string, ILissonContentType> = {
    video: ILissonContentType.Video,
    image: ILissonContentType.Image,
    audio: ILissonContentType.Audio,
    pdf: ILissonContentType.PDF,
    scorm: ILissonContentType.SCORM,
  };

  let detectedType: string | null = null;
  let contentUrl = "";

  for (const field in contentTypeMap) {
    if (files?.[field]?.[0]?.path) {
      detectedType = field;
      contentUrl = files[field][0].path;
      break;
    }
  }

  if (!detectedType) {
    throw new AppError(400, "No valid content file uploaded.");
  }

  // ✅ Lesson object তৈরি করো enum value দিয়ে
  const newLesson: ILesson = {
    lessonName,
    contentUrl,
    article,
    duration: 0,
    isCompleted: false,
  };

  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError(404, "Course not found");
  }

  // ✅ নতুন module তৈরি করো
  const newModule: IModule = {
    moduleName,
    lessons: [newLesson], // subdocument হিসেবে lesson যাবে
  };

  course.modules.push(newModule);
  await course.save();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "New module created with one lesson!",
    data: course,
  });
});

export const milestoneContainer = {
  createMilestone
}