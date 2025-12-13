import { IUser } from "./user.interface";
export declare const UserServices: {
    signUp: (data: Partial<IUser>) => Promise<{
        _id: import("mongoose").Types.ObjectId;
        fullName: string;
        email: string;
        phone?: string;
        bio?: string;
        avatarUrl?: string;
        dateOfBirth?: Date;
        role: string;
        isActive: boolean;
        enrollCourse: import("./user.interface").IEnrollCourse[];
        lastLogin?: Date;
        createdAt?: Date;
        updatedAt?: Date;
        __v: number;
    }>;
    signIn: (data: {
        email: string;
        password: string;
    }) => Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        user: {
            _id: import("mongoose").Types.ObjectId;
            fullName: string;
            email: string;
            phone?: string;
            bio?: string;
            avatarUrl?: string;
            dateOfBirth?: Date;
            role: string;
            isActive: boolean;
            enrollCourse: import("./user.interface").IEnrollCourse[];
            lastLogin?: Date;
            createdAt?: Date;
            updatedAt?: Date;
            __v: number;
        };
    }>;
};
//# sourceMappingURL=user.services.d.ts.map