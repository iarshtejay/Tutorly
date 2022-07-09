const Service = require("../services/services");
const Course = require("../models/course");
const express = require("express");
const router = express.Router();
const Utils = require("../../../utils/utils");

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
            message: "Fetched all courses",
            success: true,
            data: courses,
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
            Utils.requiredRequestBodyNotFound(res, "course", {course: {
                param: Object.keys(Course.toObject())
            }});
        }
        const newCourse = await Service.createCourse(course);
        return res.status(200).json({
            message: "Added a new course",
            success: true,
            data: newCourse,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to create the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Update an existing course
 * @params req, res
 * @return courses
 */
 router.put("/update/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        if(!courseId){
            Utils.requiredRequestBodyNotFound(res, "course", {course: {
                param: id
            }});
        }
        const course = req.body.course;
        if(!course){
            Utils.requiredRequestBodyNotFound(res, "course", {course: {
                param: Object.keys(Course.toObject())
            }});
        }
        const updatedCourse = await Service.updateCourse(courseId, course);
        return res.status(200).json({
            message: "Updated the course",
            success: true,
            data: await Service.getSpecificCourse(courseId),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to update the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get a specific course
 * @params req, res
 * @return courses
 */
 router.get("/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        if(!courseId){
            Utils.requiredRequestBodyNotFound(res, "course", {course: {
                param: id
            }});
        }
        const course = await Service.getSpecificCourse(courseId);
        return res.status(200).json({
            message: "Obtained the specific course",
            success: true,
            data: course,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Delete a specific course
 * @params req, res
 * @return courses
 */
 router.delete("/delete/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        if(!courseId){
            Utils.requiredRequestParamNotFound(res, "course", {course: {
                param: id
            }});
        }
        await Service.deleteCourse(courseId);
        return res.status(200).json({
            message: "Deleted the specific course",
            success: true,
            data: courseId,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to delete the course.",
            success: false,
        });
    }
});


module.exports = router;
