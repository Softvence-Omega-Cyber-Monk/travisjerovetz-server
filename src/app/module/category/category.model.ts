import mongoose, { Schema } from 'mongoose';
import { ICourseCategory } from './category.interface';

const CourseCategorySchema = new Schema<ICourseCategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const CourseCetegory = mongoose.model<ICourseCategory>('CourseCategory', CourseCategorySchema);
