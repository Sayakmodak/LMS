import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const CoursePurchase = new mongoose.model("CoursePurchase", coursePurchaseSchema);