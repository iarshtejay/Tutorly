const Course = require("../models/course");

const getAllCourses = async () => {
    return await Course.find({});
}

const createCourse = async (course) => {
    const course_ = await new Course(course);
    await course_.save();
    return course_;
}

const getSpecificCourse = async (id) => {
    return await Course.find({_id : id});
}

const updateCourse = async (id, course) => {
    const course_ = await Course.updateOne({ _id: id }, 
        { $set: course }, 
        { upsert: true });
    return course_;
}

const deleteCourse = async(id) => {
    return await Course.deleteOne({_id : id});
}


module.exports = {
    getAllCourses,
    createCourse,
    getSpecificCourse,
    updateCourse,
    deleteCourse
}