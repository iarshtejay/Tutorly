const Service = require("../services/services");
const Tutor = require("../models/tutor");
const express = require("express");
const router = express.Router();
const Utils = require("../../../utils/utils");

/**
 * @author Arshdeep Singh
 * @description Get all tutors from the database
 * @params req, res
 * @return tutors
 */
router.get("/all", async (req, res) => {
    try {
        const tutors = await Service.getAllTutors();
        console.log("tutors", tutors);
        return res.status(200).json({
            message: "Fetched all tutors",
            success: true,
            data: tutors,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve tutors.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Register a new tutor
 * @params req, res
 * @return tutors
 */
 router.post("/add", async (req, res) => {
    try {
        const tutor = req.body.tutor;
        if(!tutor){
            Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: Object.keys(Tutor.toObject())
            }});
        }
        const newTutor = await Service.createTutor(tutor);
        return res.status(200).json({
            message: "Added a new tutor",
            success: true,
            data: newTutor,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to register the tutor.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Update an existing tutor
 * @params req, res
 * @return tutors
 */
 router.put("/update/:id", async (req, res) => {
    try {
        const tutorId = req.params.id;
        if(!tutorId){
            Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: id
            }});
        }
        const tutor = req.body.tutor;
        if(!tutor){
            Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: Object.keys(Tutor.toObject())
            }});
        }
        const updatedTutor = await Service.updateTutor(tutorId, tutor);
        return res.status(200).json({
            message: "Updated the tutor",
            success: true,
            data: await Service.getSpecificTutor(tutorId),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to update the tutor.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Get a specific tutor
 * @params req, res
 * @return tutor
 */
 router.get("/:id", async (req, res) => {
    try {
        const tutorId = req.params.id;
        if(!tutorId){
            Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: id
            }});
        }
        const tutor = await Service.getSpecificTutor(tutorId);
        return res.status(200).json({
            message: "Obtained the specific tutor",
            success: true,
            data: tutor,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the tutor.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Delete a specific tutor
 * @params req, res
 * @return tutors
 */
 router.delete("/delete/:id", async (req, res) => {
    try {
        const tutorId = req.params.id;
        if(!tutorId){
            Utils.requiredRequestParamNotFound(res, "tutor", {tutor: {
                param: id
            }});
        }
        await Service.deleteTutor(tutorId);
        return res.status(200).json({
            message: "Deleted the specific tutor",
            success: true,
            data: tutorId,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to delete the tutor.",
            success: false,
        });
    }
});


/**
 * @author Arshdeep Singh
 * @description Get all courses taught by tutor
 * @params req, res
 * @return courses
 */
 router.get("/:id/courses", async (req, res) => {
    try {
        const tutorId = req.params.id;
        if(!tutorId){
            Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: id
            }});
        }
        const courses = await Service.getAllCoursesByTutor(tutorId);
        return res.status(200).json({
            message: "Obtained all the courses offered by tutor",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the courses by tutor.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get all students that the tutors can be recommended for
 * @params req, res
 * @return students
 */
 router.get("/student/recommendations", async (req, res) => {
    try {
        const { id: tutorId } = req.body.tutor;
        const courses = await Service.recommendStudents(tutorId);
        return res.status(200).json({
            message: "Sucessfully got the student recommendations.",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to get the student recommendations.",
            success: false,
        });
    }
});

module.exports = router;
