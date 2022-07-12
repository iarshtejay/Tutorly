const Course = require("../models/course");
const Student = require("../../students/models/student");

const getAllCourses = async () => {
    return await Course.find({}).populate('tutor');
}

const createCourse = async (course) => {
    console.log(course)
    const course_ = await Course(course);
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

const getAllStudents = async (id) => {
    const courseObj =  (await Course.findOne({_id : id}));
    const studentIds = courseObj?.students?courseObj.students:[]
    const students = Promise.all(studentIds.map(async (studentId) => {return (await Student.findOne({_id : studentId }))}))
    return students;
}

module.exports = {
    getAllCourses,
    createCourse,
    getSpecificCourse,
    updateCourse,
    deleteCourse,
    getAllStudents
}