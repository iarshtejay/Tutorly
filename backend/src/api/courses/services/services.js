const Course = require("../models/course");
const Student = require("../../students/models/Student");

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

const getAllStudents = async (id) => {
    const studentIds =  await Course.find({_id : id}).students;
    const students = []
    studentIds.map(studentId => {
        const student = await Student.findOne({_id : studentId })
        if(student){
            students.push(student);
        }
    })
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