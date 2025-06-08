import { Lecture } from "../models/lecture.model.js";
import { Course } from "../models/course.model.js";
export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle || !courseId) {
            return res.status(404).json({
                success: false,
                message: "Lecture title is required"
            })
        }

        // Create lecture
        const lecture = await Lecture.create({ lectureTitle });

        // finding the course and push the lecture into the course
        const course = await Course.findById(courseId);
        if (course) {
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(201).json({
            success: true,
            message: "Lecture created successfully",
            lecture
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Falied to create lecture"
        })
    }
}

export const getAllLectures = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("lectures");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Failed to find the course"
            })
        }

        return res.status(200).json({
            success: true,
            lectures: course.lectures // lectures from course model
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Falied to get lectures"
        })
    }
}