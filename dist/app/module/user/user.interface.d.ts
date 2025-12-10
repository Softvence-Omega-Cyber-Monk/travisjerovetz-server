import { Types } from "mongoose";
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
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare enum IRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
//# sourceMappingURL=user.interface.d.ts.map