const Service = require("../services/services");
const LearningPath = require("../models/LearningPath");
const express = require("express");
const router = express.Router();
const Utils = require("../../../utils/utils");

/**
 * @author Arshdeep Singh
 * @description Get all learning paths from the database
 * @params req, res
 * @return learning-paths
 */
router.get("/all", async (req, res) => {
    try {
        const learningPaths = await Service.getAllLearningPaths();
        console.log("learning paths", learningPaths);
        return res.status(200).json({
            message: "Fetched all learning paths",
            success: true,
            data: learningPaths,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve learning paths.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Register a new learning path
 * @params req, res
 * @return learning-paths
 */
 router.post("/add", async (req, res) => {
    try {
        const learningPath = req.body.learningPath;
        if(!learningPath){
            Utils.requiredRequestBodyNotFound(res, "learningPath", {learningPath: {
                param: Object.keys(LearningPath.toObject())
            }});
        }
        const newlearningPath = await Service.createLearningPath(learningPath);
        return res.status(200).json({
            message: "Added a new learningPath",
            success: true,
            data: newlearningPath,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to register the learningPath.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Update an existing learningPath
 * @params req, res
 * @return learningPaths
 */
 router.put("/update/:id", async (req, res) => {
    try {
        const learningPathId = req.params.id;
        if(!learningPathId){
            Utils.requiredRequestBodyNotFound(res, "learningPath", {learningPath: {
                param: id
            }});
        }
        const learningPath = req.body.learningPath;
        if(!learningPath){
            Utils.requiredRequestBodyNotFound(res, "learningPath", {learningPath: {
                param: Object.keys(LearningPath.toObject())
            }});
        }
        const updatedlearningPath = await Service.updateLearningPath(learningPathId, learningPath);
        return res.status(200).json({
            message: "Updated the learningPath",
            success: true,
            data: await Service.getSpecificLearningPath(learningPathId),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to update the learningPath.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Get a specific learningPath
 * @params req, res
 * @return learningPath
 */
 router.get("/:id", async (req, res) => {
    try {
        const learningPathId = req.params.id;
        if(!learningPathId){
            Utils.requiredRequestBodyNotFound(res, "learningPath", {learningPath: {
                param: id
            }});
        }
        const learningPath = await Service.getSpecificLearningPath(learningPathId);
        return res.status(200).json({
            message: "Obtained the specific learningPath",
            success: true,
            data: learningPath,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the learningPath.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Delete a specific learningPath
 * @params req, res
 * @return learningPaths
 */
 router.delete("/delete/:id", async (req, res) => {
    try {
        const learningPathId = req.params.id;
        if(!learningPathId){
            Utils.requiredRequestParamNotFound(res, "learningPath", {learningPath: {
                param: id
            }});
        }
        await Service.deleteLearningPath(learningPathId);
        return res.status(200).json({
            message: "Deleted the specific learningPath",
            success: true,
            data: learningPathId,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to delete the learningPath.",
            success: false,
        });
    }
});


/**
 * @author Arshdeep Singh
 * @description Get all courses taught by learningPath
 * @params req, res
 * @return courses
 */
 router.get("/:id/courses", async (req, res) => {
    try {
        const learningPathId = req.params.id;
        if(!learningPathId){
            Utils.requiredRequestBodyNotFound(res, "learningPath", {learningPath: {
                param: id
            }});
        }
        const courses = await Service.getAllCoursesByLearningPath(learningPathId);
        return res.status(200).json({
            message: "Obtained all the courses offered by learningPath",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the courses by learningPath.",
            success: false,
        });
    }
});


module.exports = router;
