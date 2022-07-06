const Service = require("../services/services");
const express = require("express");
const router = express.Router();

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get all courses from the database
 * @params req, res
 * @return courses
 */
router.get("/all", async (req, res) => {
    try {
        const courses = await Service.getAllCourses();
        console.log("courses", courses);
        return res.status(200).json({
            courses,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve courses.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Create a new course
 * @params req, res
 * @return courses
 */
 router.post("/add", async (req, res) => {
    try {
        const course = req.body.course;
        if(!course){
            requestParamCourseNotFound(res);
        }
        const courses = await Service.createCourse(course);
        return res.status(200).json({
            courses
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve courses.",
            success: false,
        });
    }
});



module.exports = router;
