import { Types } from "mongoose";
import { ICourse, IUpCourse } from "./course.interface";
export declare const courseServices: {
    createCourse: (payload: ICourse) => Promise<import("mongoose").Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateCourse: (courseId: Types.ObjectId, payload: Partial<IUpCourse>) => Promise<(import("mongoose").Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=course.service.d.ts.map