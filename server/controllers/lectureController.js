import { Lecture } from "../models/lecture.model.js";
import { Course } from "../models/course.model.js";
import { deleteVideoFromCloudinary } from "../utils/cloudinary.js";

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body; // coming from the client formData
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
        const course = await Course.findById(courseId).populate({ path: "lectures" });

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

export const updateLecture = async (req, res) => {
    try {
        const { lectureTitle, isPreviewFree, uploadVideoInfo } = req.body;
        const { courseId, lectureId } = req.params;

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            })
        }

        // update lecture
        if (lectureTitle) lecture.lectureTitle = lectureTitle;
        if (uploadVideoInfo.videoUrl) lecture.videoUrl = uploadVideoInfo.videoUrl;
        if (uploadVideoInfo.publicId) lecture.publicId = uploadVideoInfo.publicId;
        if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

        await lecture.save();

        // adding the lectureId in the course if it was not there
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(200).json({
            success: true,
            message: "Lecture updated successfully",
            lecture
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Falied to update lecture"
        })
    }
}

// Remove lecture
export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            })
        }
        // delete video from cloudinary
        if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId);
        }

        // delete lecture from the associated course as well
        await Course.updateOne(
            { lectures: lectureId }, // find the course that contains the lecture 
            { $pull: { lectures: lectureId } } // remove the lecture from the course
        )

        return res.status(200).json({
            success: true,
            message: "Lecture removed successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to remove lecture"
        })
    }
}

export const getLectuteById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            })
        }

        res.status(200).json({
            success: true,
            lecture
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get lecture"
        })
    }
}