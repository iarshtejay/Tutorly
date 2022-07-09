const Service = require("../services/services");
const express = require("express");
const router = express.Router();

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Archives a specific course for a student
 * @params req, res
 * @return boolean
 */
router.post("/course/archive/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        const { id: studentId } = req.body.student;
        if (!courseId) {
            Utils.requiredRequestParamNotFound(res, "course", {
                course: {
                    param: id,
                },
            });
        }
        const student = await Service.archiveCourse(studentId, courseId);
        return res.status(200).json({
            message: "Archived the course.",
            success: true,
            data: student,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to archive the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Unarchives a specific course for a student
 * @params req, res
 * @return boolean
 */
router.post("/course/unarchive/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        const { id: studentId } = req.body.student;
        if (!courseId) {
            Utils.requiredRequestParamNotFound(res, "course", {
                course: {
                    param: id,
                },
            });
        }
        const student = await Service.unArchiveCourse(studentId, courseId);
        return res.status(200).json({
            message: "Unarchived the course.",
            success: true,
            data: student,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to unarchive the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get a specific course progress for a student
 * @params req, res
 * @return number
 */
router.get("/course/progress/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        const { id: studentId } = req.body.student;
        if (!courseId) {
            Utils.requiredRequestParamNotFound(res, "course", {
                course: {
                    param: id,
                },
            });
        }
        const student = await Service.getCourseProgress(studentId, courseId);
        if (student) {
            return res.status(200).json({
                message: "Retrieved the course progress.",
                success: true,
                data: student,
            });
        } else {
            return res.status(200).json({
                message: "Unable to retrieved the course progress as the student hasn't enrolled for this course.",
                success: false
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to get the course progress.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Set a specific course progress for a student
 * @params req, res
 * @return number
 */
router.put("/course/progress/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        const { id: studentId } = req.body.student;
        const { progess: courseProgress } = req.body.course;
        if (!courseId) {
            Utils.requiredRequestParamNotFound(res, "course", {
                course: {
                    param: id,
                },
            });
        }
        const student = await Service.setCourseProgress(studentId, courseId, courseProgress);
        if (student) {
            return res.status(200).json({
                message: "Updated the course progress.",
                success: true,
                data: student,
            });
        } else {
            return res.status(200).json({
                message: "Unable to set the course progress as the student hasn't enrolled for this course.",
                success: false
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to set the course progress.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get all courses that the student has enrolled
 * @params req, res
 * @return courses
 */
router.get("/courses/enrolled", async (req, res) => {
    try {
        const { id: studentId } = req.body.student;
        const courses = await Service.getAllEnrolledCourses(studentId);
        return res.status(200).json({
            message: "Sucessfully set the course progress.",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to set the course progress.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get all courses that the student has archived
 * @params req, res
 * @return courses
 */
router.get("/courses/archived", async (req, res) => {
    try {
        const { id: studentId } = req.body.student;
        const courses = await Service.getAllArchivedCourses(studentId);
        return res.status(200).json({
            message: "Sucessfully set the course progress.",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to set the course progress.",
            success: false,
        });
    }
});

module.exports = router;
