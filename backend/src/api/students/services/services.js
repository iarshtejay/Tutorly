const Student = require("../models/student");

const checkIfCourseExistsAndUpdate = (student, courseId, archived) => {
    for (let i=0; i < student.courses.length; i++){
        const course = student.courses[i];
        if(course._id === courseId){
            course.archived = archived;
            return student;
        } else if ((course._id !== courseId) && (i === student.courseslength - 1) && archived){
            student.courses.push({
                _id: courseId,
                progress: 0,
                archived: archived
            })
            return student;
        }
    };
    
}

const courseProgressHandler = (student, courseId, courseProgress) => {
    for (let i=0; i < student.courses.length; i++) {
        const course = student.courses[i];
        if(course._id === courseId){
            return course.progress;
        } else if ((course._id !== courseId) && (i === student.courseslength - 1)){
            return false;
        }
    }
}

const archiveCourse = async (studentId, courseId) => {
    const student = await Student.findById({_id: studentId});
    const newStudent = checkIfCourseExistsAndUpdate(student, courseId, true);
    return await newStudent.save();
}

const unArchiveCourse = async (studentId, courseId) => {
    const student = await Student.findById({_id: studentId});
    const newStudent = checkIfCourseExistsAndUpdate(student, courseId, false);
    return await newStudent.save();
}

const getCourseProgress = async (student, courseId) => {
    const student = await Student.findById({_id: studentId});
    return courseProgressHandler(student, courseId);
}

const setCourseProgress = async (student, courseId, courseProgress) => {
    const student = await Student.findById({_id: studentId});
    return courseProgressHandler(student, courseId, courseProgress);
}

module.exports = {
    archiveCourse,
    unArchiveCourse,
    getCourseProgress,
    setCourseProgress
}
