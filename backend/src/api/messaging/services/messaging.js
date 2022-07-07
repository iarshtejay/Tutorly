const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("../../../db");
const Messages = require("../schema/messages");


/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const postMessage = async (sender_user_id, receiver_user_id, conversation_id, message) => {

    const response = await new Messages({
        sender_user_id,
        receiver_user_id,
        conversation_id,
        message
    }).save();

    return response._id;
};

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const getMessages = async (conversation_id) => {
    
    if(!isValidObjectId(conversation_id)){
        return [];
    }
    
    return await Messages.find({
        conversation_id: ObjectId(conversation_id)
    });
};

module.exports = { postMessage, getMessages };
