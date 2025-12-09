import mongoose, { Schema, Document } from 'mongoose';
import { ILesson } from './courseLesson.interface';


export interface ILessonDocument extends ILesson, Document {}

const LessonSchema: Schema = new Schema(
  {
    lessonName: {
      type: String,
      required: [true, 'Lesson name is required'],
      trim: true,
    },
    contentType: {
      type: String,
      enum: ['Video/Image', 'Audio', 'Text/PDF', 'Upload SCORM'],
      required: [true, 'Content type is required'],
    },
    contentUrl: {
      type: String,
      trim: true,
    },
    article: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      required: true,
      default: 1,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const lession = mongoose.model<ILessonDocument>('Lesson', LessonSchema);