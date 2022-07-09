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

const courseProgressHandler = (student, courseId, type, courseProgress) => {
    for (let i=0; i < student.courses.length; i++) {
        const course = student.courses[i];
        if(course._id === courseId){
            if(type === "get"){
                return course.progress;
            } else if (type === "set"){
                course.progress = courseProgress;
                await student.save();
                return course.progress;
            }
        } else if ((course._id !== courseId) && (i === student.courseslength - 1)){
            return false;
        }
    }
}

const getAllCoursesTypeHandler = (student, type) => {
    const archivedCourses = [];
    const enrolledCourses = [];
    for (let i=0; i < student.courses.length; i++) {
        const course = student.courses[i];
        if(course.archived === true){
            archivedCourses.push(course);
        } else {
            enrolledCourses.push(course);
        }
    }
    return type === "archived"? archivedCourses: enrolledCourses;
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

const getCourseProgress = async (studentId, courseId) => {
    const student = await Student.findById({_id: studentId});
    return courseProgressHandler(student, courseId, "get", null);
}

const setCourseProgress = async (studentId, courseId, courseProgress) => {
    const student = await Student.findById({_id: studentId});
    return courseProgressHandler(student, courseId, "set", courseProgress);
}

const getAllEnrolledCourses = async(studentId) => {
    const student = await Student.findById({_id: studentId});
    getAllCoursesTypeHandler(student, "enrolled");
}

const getAllArchivedCourses = async(studentId) => {
    const student = await Student.findById({_id: studentId});
    getAllCoursesTypeHandler(student, "archived");
}

module.exports = {
    archiveCourse,
    unArchiveCourse,
    getCourseProgress,
    setCourseProgress,
    getAllEnrolledCourses,
    getAllArchivedCourses
}
