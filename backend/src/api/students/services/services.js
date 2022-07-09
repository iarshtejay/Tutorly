const Student = require("../models/student");
const Course = require("../models/course");

const checkIfCourseExistsAndUpdate = (student, courseId, archived) => {
    for (let i = 0; i < student.courses.length; i++) {
        const course = student.courses[i];
        if (course._id === courseId) {
            course.archived = archived;
            return student;
        } else if ((course._id !== courseId) && (i === student.courseslength - 1) && archived) {
            student.courses.push({
                _id: courseId,
                progress: 0,
                archived: archived
            })
            return student;
        }
    };

}

const checkIfCourseExistsAndUnEnroll = (student, course) => {
    student.courses = (student.courses).filter(course_ => course_._id !== course._id)
    course.students = (course.students).filter(student_ => student_.id !== student.id)
    return { student: student, course: course }
}

const checkIfCourseExistsAndEnroll = (student, course) => {
    if ((student.courses).find(course_ => course_.id === course.id)) {
        return { student: student, course: course }
    }
    (student.courses).push(course)
        (course.students).push(student)

    return { student: student, course: course }
}

const courseProgressHandler = (student, courseId, courseProgress) => {
    for (let i = 0; i < student.courses.length; i++) {
        const course = student.courses[i];
        if (course._id === courseId) {
            return course.progress;
        } else if ((course._id !== courseId) && (i === student.courseslength - 1)) {
            return false;
        }
    }
}

const archiveCourse = async (studentId, courseId) => {
    const student = await Student.findById({ _id: studentId });
    const newStudent = checkIfCourseExistsAndUpdate(student, courseId, true);
    return await newStudent.save();
}

const unArchiveCourse = async (studentId, courseId) => {
    const student = await Student.findById({ _id: studentId });
    const newStudent = checkIfCourseExistsAndUpdate(student, courseId, false);
    return await newStudent.save();
}

const getCourseProgress = async (student, courseId) => {
    const student = await Student.findById({ _id: studentId });
    return courseProgressHandler(student, courseId);
}

const setCourseProgress = async (student, courseId, courseProgress) => {
    const student = await Student.findById({ _id: studentId });
    return courseProgressHandler(student, courseId, courseProgress);
}

const enrollInACourse = async (studentId, courseId) => {
    const student = await Student.findById({ _id: studentId });
    const course = await Student.findById({ _id: courseId });
    const { student: newStudent, course: newCourse } = checkIfCourseExistsAndEnroll(student, course);
    return (await newStudent.save()) && (await newCourse.save());
}

const unenrollFromACourse = async (studentId, courseId) => {
    const student = await Student.findById({ _id: studentId });
    const course = await Student.findById({ _id: courseId });
    const { student: newStudent, course: newCourse } = checkIfCourseExistsAndUnEnroll(student, course);
    return (await newStudent.save()) && (await newCourse.save());
}

module.exports = {
    archiveCourse,
    unArchiveCourse,
    getCourseProgress,
    setCourseProgress
}
