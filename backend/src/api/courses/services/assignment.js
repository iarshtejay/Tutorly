/*
    Author: Parth Shah
*/

const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const Assignment = require("../models/assignment");
const AssignmentAttempt = require("../models/assignmentAttempt");

const generateSignedUrlUpload = async () => {
    const id = uuidv4();
    const storage = new Storage();

    const bucket = storage.bucket("tutorly-assignment-attachments");
    const file = bucket.file(`${id}.pdf`);

    const options = {
        version: "v4",
        action: "write",
        expires: Date.now() + 1000 * 60 * 60, // one hour
        contentType: "application/pdf",
    };

    const [url] = await file.getSignedUrl(options);

    return { url, id };
};

const createAssignment = async (assignment) => {
    const newAssignment = new Assignment(assignment);
    await newAssignment.save();
};

const deleteAssignment = async (assignmentId) => {
    await Assignment.findByIdAndDelete(assignmentId);
};

const getAssignments = async (course) => {
    const assignments = await Assignment.find({ course }).lean();
    const storage = new Storage();
    const bucket = storage.bucket("tutorly-assignment-attachments");

    for (let i = 0; i < assignments.length; i++) {
        assignments[i].attachmentUrls = [];
        for (let j = 0; j < assignments[i].attachments.length; j++) {
            // generate signed url for each attachment
            const file = bucket.file(`${assignments[i].attachments[j]}.pdf`);
            const options = {
                version: "v4",
                action: "read",
                expires: Date.now() + 1000 * 60 * 60, // one hour
            };
            const [url] = await file.getSignedUrl(options);
            assignments[i].attachmentUrls.push(url);
        }
    }

    return assignments;
};

const attemptAssignment = async (attempt) => {
    // prevent multiple attempts by the same student
    const existingAttempt = await AssignmentAttempt.findOne({
        assignment: attempt.assignment,
        student: attempt.student,
    });

    if (existingAttempt) {
        throw new Error("You have already attempted this assignment");
    }

    const newAttempt = new AssignmentAttempt(attempt);
    await newAttempt.save();
};

const getAttempts = async (assignmentId) => {
    const attempts = await AssignmentAttempt.find({ assignment: assignmentId }).lean();
    const storage = new Storage();
    const bucket = storage.bucket("tutorly-assignment-attachments");

    for (let i = 0; i < attempts.length; i++) {
        attempts[i].attachmentUrls = [];
        for (let j = 0; j < attempts[i].attachments.length; j++) {
            // generate signed url for each attachment
            const file = bucket.file(`${attempts[i].attachments[j]}.pdf`);
            const options = {
                version: "v4",
                action: "read",
                expires: Date.now() + 1000 * 60 * 60, // one hour
            };
            const [url] = await file.getSignedUrl(options);
            attempts[i].attachmentUrls.push(url);
        }
    }

    return attempts;
};

const submitFeedback = async (attemptId, feedback) => {
    const attempt = await AssignmentAttempt.findById(attemptId);
    if (!attempt) {
        throw new Error("Attempt not found");
    }
    attempt.feedback = feedback;
    await attempt.save();
};

const getStudentAttempts = async (courseId, studentId) => {
    const assignments = await Assignment.find({ course: courseId }).lean();

    const storage = new Storage();
    const bucket = storage.bucket("tutorly-assignment-attachments");

    for (let i = 0; i < assignments.length; i++) {
        assignments[i].attachmentUrls = [];
        for (let j = 0; j < assignments[i].attachments.length; j++) {
            // generate signed url for each attachment
            const file = bucket.file(`${assignments[i].attachments[j]}.pdf`);
            const options = {
                version: "v4",
                action: "read",
                expires: Date.now() + 1000 * 60 * 60, // one hour
            };
            const [url] = await file.getSignedUrl(options);
            assignments[i].attachmentUrls.push(url);
        }

        const findAttempt = await AssignmentAttempt.findOne({
            assignment: assignments[i]._id,
            student: studentId,
        });

        if (findAttempt) {
            assignments[i].feedback = findAttempt.feedback;
        }
    }

    return assignments;
};

module.exports = {
    generateSignedUrlUpload,
    createAssignment,
    deleteAssignment,
    getAssignments,
    attemptAssignment,
    getAttempts,
    submitFeedback,
    getStudentAttempts,
};
