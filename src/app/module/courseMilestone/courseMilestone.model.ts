import mongoose, { Schema, Document } from 'mongoose';
import { IModule } from './courseMilestone.interface';

export interface IModuleDocument extends IModule, Document { }

const ModuleSchema: Schema = new Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseCategory',
      required: [true, 'Course ID is required'],
      index: true,
    },
    moduleName: {
      type: String,
      required: [true, 'Module name is required'],
      trim: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    order: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

// Index for better query performance
ModuleSchema.index({ courseId: 1, order: 1 });

export const module = mongoose.model<IModuleDocument>('Module', ModuleSchema);