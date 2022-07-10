const LearningPath = require("../models/LearningPath");

const getAllLearningPaths = async () => {
    return await LearningPath.find({});
}

const createLearningPath = async (tutor) => {
    const tutor_ = await new LearningPath(tutor);
    await tutor_.save();
    return tutor_;
}

const getSpecificLearningPath = async (id) => {
    return await LearningPath.find({_id : id});
}

const updateLearningPath = async (id, tutor) => {
    const tutor_ = await LearningPath.updateOne({ _id: id }, 
        { $set: tutor }, 
        { upsert: true });
    return tutor_;
}

const deleteLearningPath = async(id) => {
    return await LearningPath.deleteOne({_id : id});
}

const getAllCoursesByLearningPath = async(id) => {
    return await LearningPath.find({_id : id}).courses;
}


module.exports = {
    getAllLearningPaths,
    createLearningPath,
    getSpecificLearningPath,
    updateLearningPath,
    deleteLearningPath,
    getAllCoursesByLearningPath,
}