import { Types } from "mongoose";

export interface IEnrollCourse {
    courseId: Types.ObjectId,
    date?: Date
}

export interface IUser {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    bio?: string;
    avatarUrl?: string;
    dateOfBirth?: Date;
    role: string;
    isActive: boolean;
    enrollCourse: IEnrollCourse[],
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}


export enum IRole {
    ADMIN = "ADMIN",
    USER = "USER"
}