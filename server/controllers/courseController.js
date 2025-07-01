import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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

export const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const {
            courseTitle,
            courseSubtitle,
            description,
            category,
            courseLevel,
            coursePrice } = req.body; // coming from the formData
        const thumbnail = req.file;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId);
            }
            courseThumbnail = await uploadMedia(thumbnail.path);
        }

        const updateData = {
            courseTitle,
            courseSubtitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail: courseThumbnail?.secure_url
        };
        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
        return res.status(200).json({
            success: true,
            message: "Course updated successfully", course
        })

    } catch (error) {
        // console.log("Update course error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course"
        })
    }
}

export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        return res.status(200).json({
            course
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get course by id"
        })
    }
}

// Publish and Unpublish Course
export const togglePublish = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query;  // true, false

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        course.isPublished = publish;
        await course.save();

        let coursePublishStatus;
        if (course.isPublished) {
            coursePublishStatus = "published"
        }
        else {
            coursePublishStatus = "unpublished"
        }


        res.status(200).json({
            message: `Course is ${coursePublishStatus}`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update status"
        })
    }
}

// remove course
export const removeCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        // delete all the lectures inside the course
        if (course.lectures && course.lectures.length > 0) {
            await Lecture.deleteMany({ _id: { $in: course.lectures } })
        }
        // delete the course
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            success: true,
            message: "Course and all its lectures are deleted"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to remove the course"
        })
    }
}