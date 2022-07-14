const { isValidObjectId, isObjectIdOrHexString } = require("mongoose");
const { ObjectId } = require("../../../db");
const Conversation = require("../schema/conversation");
const Messages = require("../schema/messages");
require("./../../users/schema/users");

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
    if (!isValidObjectId(userId)) {
        return [];
    }

    const conversations = await Conversation.find({
        users: ObjectId(userId),
    }).populate({ path: "users", model: "users", select: "-password" });

    const lastMessages = await Messages.find({
        conversion_id: { $in: conversations.map((x) => x._id) },
    })
        .sort({ "audit.created_on": 1 })
        .limit(1);

    const lastMessageMap = lastMessages.reduce((p, c) => {
        return { ...p, [c.conversation_id.toString()]: c };
    }, {});

    return conversations.map((convo) => {
        const { users, _id } = convo;

        console.log(users)
        const otherUserIndex = users[0]._id.toString() === userId ? 1 : 0;
        
        return {
            conversation_id: _id,
            name: `${users[otherUserIndex].firstname} ${users[otherUserIndex].lastname}`,
            user_id: users[otherUserIndex]._id,
            last_message: lastMessageMap[_id]?.message,
            last_message_on: lastMessageMap[_id]?.audit.created_on
        };
    });
};

module.exports = { createConversation, getUserConversations };
