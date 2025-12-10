import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/AppError";
import { sendResponse } from "../../utils/sendResponse";
import { ILesson } from "../course/course.interface";
import { Course } from "../course/course.model";
import { ILissonContentType } from "./courseLesson.interface";


const createLesson = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (!req.body.data) {
    throw new AppError(400, "Missing form data.");
  }

  const parsedData = JSON.parse(req.body.data);
  const { courseId, moduleId, lessonName, article, duration } = parsedData;

  if (!courseId || !moduleId || !lessonName) {
    throw new AppError(400, "courseId, moduleId, lessonName are required");
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

  const newLesson: ILesson = {
    lessonName,
    contentUrl,
    article,
    duration,
    isCompleted: false,
  };

  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError(404, "Course not found");
  }

  // ✅ Safe find module (find ব্যবহার করো)
  const module = course.modules.find(
    (m: any) => m._id?.toString() === moduleId
  );

  if (!module) {
    throw new AppError(404, "Module not found");
  }

  // ✅ Lesson push করো
  module.lessons.push(newLesson);

  await course.save();

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Lesson created and added to module successfully.",
    data: course,
  });
});
export const LessionController = {
    createLesson
}