import { model, Schema } from "mongoose";
import { IRole, IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
        },

        bio: {
            type: String,
        },

        avatarUrl: {
            type: String,
        },

        dateOfBirth: {
            type: Date,
        },

        role: {
            type: String,
            enum: IRole,
            default: IRole.USER,
        },
        isActive: {
            type: Boolean,
            default: true,
        },

        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export const User = model<IUser>("User", userSchema);
