const Course = require("../models/course");

const getAllCourses = async () => {
    return await Course.find({});
}

const createCourse = async (course) => {
    const course_ = await new Course(course);
    await course_.save();
    return course_;
}

module.exports = {
    getAllCourses,
    createCourse
}