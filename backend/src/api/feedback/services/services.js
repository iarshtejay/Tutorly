const FeedBack = require("../models/FeedBack");

const getAllFeedBacks = async () => {
    return await FeedBack.find({});
}

const createFeedBack = async (feedback) => {
    const feedback_ = await new FeedBack(feedback);
    await feedback_.save();
    return feedback_;
}

const getSpecificFeedBackByUserId = async (user_id) => {
    return await FeedBack.find({_id : user_id});
}

const getSpecificFeedBackByCourseId = async (course_id) => {
    return await FeedBack.find({_id : course_id});
}

module.exports = {
    getAllFeedBacks,
    createFeedBack,
    getSpecificFeedBackByUserId,
    getSpecificFeedBackByCourseId    
}