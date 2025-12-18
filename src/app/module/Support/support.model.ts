import { model, Schema } from "mongoose";


const supportSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    problemDescription: {
        type: String,
        required: true
    },
    solveStatus: {
        type: String,
        enum: ["Pending", "Resolve"],
        default: "Pending"
    },
    replay: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false,

});

supportSchema.index(
    { createdAt: -1 },
    { expireAfterSeconds: 60 * 60 * 24 * 30 }
)


export const Support = model("Support", supportSchema);