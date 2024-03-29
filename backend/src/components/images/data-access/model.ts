import mongoose, { Schema } from "mongoose";

const ImageTaskSchema = new Schema({
    status: {
        type: String,
        enum: ["pending", "running", "completed", "failed"],
        default: "pending"
    },
    data: {
        imageSrc: String,
        outputSrc: String,
        maxWidth: Number,
        maxHeight: Number,
        fillStr: String
    },
    progress: {
        type: Number
    },
    error: {
        type: String
    }
}, {
    timestamps: true
})

export const ImageTask = mongoose.model("ImageTask", ImageTaskSchema)