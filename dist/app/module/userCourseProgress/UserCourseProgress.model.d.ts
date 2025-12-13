import mongoose from "mongoose";
export declare const UserCourseProgress: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    courseProgress: number;
    modules: mongoose.Types.DocumentArray<{
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }> & {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }>;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    courseProgress: number;
    modules: mongoose.Types.DocumentArray<{
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }> & {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }>;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    courseProgress: number;
    modules: mongoose.Types.DocumentArray<{
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }> & {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    courseProgress: number;
    modules: mongoose.Types.DocumentArray<{
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }> & {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }>;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    courseProgress: number;
    modules: mongoose.Types.DocumentArray<{
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }> & {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }>;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    courseProgress: number;
    modules: mongoose.Types.DocumentArray<{
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }> & {
        moduleId: mongoose.Types.ObjectId;
        progress: number;
        completedLessons: mongoose.Types.ObjectId[];
    }>;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=UserCourseProgress.model.d.ts.map