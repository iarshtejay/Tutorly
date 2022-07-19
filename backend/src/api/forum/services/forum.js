/**
 * @author Harsh Shah
 */
const { isValidObjectId, isObjectIdOrHexString } = require("mongoose");
const { ObjectId } = require("../../../db");
const Course = require("../../courses/models/course");
const User = require("../../userManagement/models/user");
const Forum = require("../schema/forum");
const Student = require("../../students/models/student");
const Tutor = require("../../tutors/models/tutor");

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const createForum = async (course_id) => {
    if (!isValidObjectId(course_id)) {
        return {};
    }

    const response = await new Forum({
        course_id,
        status: "active",
    }).save();

    return response._id;
};

/**
 * @author Harsh Shah
 * @description
 * @params user_id
 * @return forums
 */
const getForums = async (user_id) => {
    if (!isValidObjectId(user_id)) {
        return [];
    }


    const user = await User.findOne({
        _id: user_id,
    }).populate({
        path: "tutor",
        populate: {
            path: "courses",
            populate: {
                path: "course",
                model: "Course",
            },
        },
    })
    .populate({
        path: "student",
        populate: {
            path: "courses",
            populate: {
                path: "course",
                model: "Course",
            },
        },
    }).lean();

    console.log(user);

    const userRole = user.student || user.tutor;
    const course_ids = userRole.courses.map(x => x.course._id);

    return await Forum.find({
        course_id: { $in: course_ids},
        status: "active",
    })
        .populate("course_id")
        .lean();
};

module.exports = { createForum, getForums };
