const { isValidObjectId, isObjectIdOrHexString } = require("mongoose");
const { ObjectId } = require("../../../db");
const Course = require("../../courses/models/course");
const User = require("../../userManagement/models/user");
const Forum = require("../schema/forum");

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

    const user = await User.findOne({ _id: user_id }).lean();

    // if(user.role === "student"){
    // } else {
    // }

    const course_id = (await Course.find({}).lean()).map((c) => c._id);

    return await Forum.find({
        course_id,
        status: "active",
    }).lean();
};
module.exports = { createForum, getForums };
