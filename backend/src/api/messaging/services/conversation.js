const { isValidObjectId, isObjectIdOrHexString } = require("mongoose");
const { ObjectId } = require("../../../db");
const Conversation = require("../schema/conversation");


/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const createConversation = async (userId1, userId2) => {
    const response = await new Conversation({
        users: [userId1, userId2],
        status: true,
    }).save();

    return response._id;
};

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const getUserConversations = async (userId) => {
    
    if(!isValidObjectId(userId)){
        return [];
    }
    
    return await Conversation.find({
        users: ObjectId(userId),
    });
};

module.exports = { createConversation, getUserConversations };
