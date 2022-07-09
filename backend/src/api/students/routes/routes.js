const Service = require("../services/services");
const express = require("express");
const router = express.Router();

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Archives a specific course for a student
 * @params req, res
 * @return boolean
 */
 router.delete("/course/archive/:id", async (req, res) => {
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

module.exports = router;