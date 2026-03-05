import { model, Schema } from "mongoose";
import { IEarnedBadge, IRole, IUser } from "./user.interface";


const EarnedBadgeSchema = new Schema<IEarnedBadge>({
    badgeId: { type: Schema.Types.ObjectId, ref: "Badge", required: true },
    name: { type: String, required: true },
    earnedDate: { type: Date, default: Date.now },
    points: { type: Number, required: true },
    details: { type: String }
});


const userSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String
        },

        phone: {
            type: String,
        },

        bio: {
            type: String,
        },

        avatarUrl: {
            type: String,
            default: null
        },

        dateOfBirth: {
            type: Date,
        },

        provider: {
            type: String,
            enum: ["CREADIENTIAL", "MICROSOFT"]
        },

        role: {
            type: String,
            enum: IRole,
            default: IRole.USER,
        },
        earnedBadges: {
            type: [EarnedBadgeSchema],
            default: []
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        enrollCourse: [
            {
                courseId: {
                    type: String
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        lastLogin: {
            type: Date,
        },
        totalPoints: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

export const User = model<IUser>("User", userSchema);
