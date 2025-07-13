import mongoose from "mongoose"

const lectureProgressSchema = new mongoose.Schema({
    lectureId: { type: String },
    viewed: { type: Boolean }
})

const courseProgressSchema = new mongoose.Schema({
    courseId: { type: String },
    userId: { type: String },
    completed: { type: Boolean },
    lectureProgress: [lectureProgressSchema]   // lectureProgress array contains the lectureProgressSchema 
})


export const CourseProgress = new mongoose.model("CourseProgress", courseProgressSchema);