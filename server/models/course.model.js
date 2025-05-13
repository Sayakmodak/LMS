import mongoose from "mongoose";

const courseShema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    courseSubtitle: {
        type: String,
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    courseLevel: {
        type: String,
        enum: ["Beginer", "Intermediate", "Advance"]
    },
    coursePrice: {
        type: Number
    },
    courseThumbnail: {
        type: String
    },
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture"
        }
    ],
    creator: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const Course = mongoose.model("Course", courseShema);