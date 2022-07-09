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
        const {id: studentId} = req.body.student;
        if(!courseId){
            Utils.requiredRequestParamNotFound(res, "course", {course: {
                param: id
            }});
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
        const {id: studentId} = req.body.student;
        if(!courseId){
            Utils.requiredRequestParamNotFound(res, "course", {course: {
                param: id
            }});
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
 * @return boolean
 */
 router.get("/course/progress/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        const {id: studentId} = req.body.student;
        if(!courseId){
            Utils.requiredRequestParamNotFound(res, "course", {course: {
                param: id
            }});
        }
        const student = await Service.getCourseProgress(studentId, courseId);
        return res.status(200).json({
            message: "Retrieved the course progress.",
            success: true,
            data: student,
        });
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
 * @return boolean
 */
 router.put("/course/progress/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        const {id: studentId} = req.body.student;
        const {progess: courseProgress} = req.body.course;
        if(!courseId){
            Utils.requiredRequestParamNotFound(res, "course", {course: {
                param: id
            }});
        }
        const student = await Service.setCourseProgress(studentId, courseId, courseProgress);
        return res.status(200).json({
            message: "Sucessfully set the course progress.",
            success: true,
            data: student,
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