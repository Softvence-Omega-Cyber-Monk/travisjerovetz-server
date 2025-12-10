import { ICourse } from "./course.interface";
export declare const courseServices: {
    createCourse: (payload: ICourse) => Promise<import("mongoose").Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
};
//# sourceMappingURL=course.service.d.ts.map