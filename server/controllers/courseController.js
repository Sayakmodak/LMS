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

export const getCreatorCourse = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creator: userId });
        if (!courses) {
            return res.status(404).json({
                success: false,
                courses: [],
                message: "Course not found"
            })
        }
        return res.status(200).json({
            success: true,
            courses
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get course"
        })
    }
}