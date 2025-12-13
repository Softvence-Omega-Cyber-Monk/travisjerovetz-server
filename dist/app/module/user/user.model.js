"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
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
        enum: user_interface_1.IRole,
        default: user_interface_1.IRole.USER,
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
    }
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.model.js.map