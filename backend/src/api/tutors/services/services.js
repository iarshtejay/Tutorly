const Tutor = require("../models/tutor");

const getAllTutors = async () => {
    return await Tutor.find({});
}

const createTutor = async (tutor) => {
    const tutor_ = await new Tutor(tutor);
    await tutor_.save();
    return tutor_;
}

const getSpecificTutor = async (id) => {
    return await Tutor.find({_id : id});
}

const updateTutor = async (id, tutor) => {
    const tutor_ = await Tutor.updateOne({ _id: id }, 
        { $set: tutor }, 
        { upsert: true });
    return tutor_;
}

const deleteTutor = async(id) => {
    return await Tutor.deleteOne({_id : id});
}

const getAllCoursesByTutor = async(id) => {
    return await Tutor.find({_id : id}).courses;
}


module.exports = {
    getAllTutors,
    createTutor,
    getSpecificTutor,
    updateTutor,
    deleteTutor
}