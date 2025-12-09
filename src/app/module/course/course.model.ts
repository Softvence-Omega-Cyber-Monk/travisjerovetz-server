import { Schema, model } from "mongoose";
import { ICouesrCategoryEnum, ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        thumbnail: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            enum: ICouesrCategoryEnum,
            required: true,

        },

        prices: {
            type: Number,
            required: true,
        },

        courseTag: {
            type: String,
            required: true,
        },

        whatsUserLearn: {
            type: [String],
            required: true,
        },

        instructorName: {
            type: String,
            required: true,
        },

        instructorTitle: {
            type: String,
            required: true,
        },

        instructorDescription: {
            type: String,
            required: true,
        },

        instructorProfile: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Course = model<ICourse>("Course", courseSchema);
