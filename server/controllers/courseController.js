import { Course } from "../models/course.model.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({
                success: false,
                message: "Course title and Category is required"
            })
        }

        const course = await Course.create({
            courseTitle: courseTitle,
            category: category,
            creator: req.id
        })

        return res.status(200).json({
            course,
            success: true,
            message: "Course Created"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create course"
        })
    }
}