/**
 * @author Harsh Shah
 */
const { isValidObjectId, isObjectIdOrHexString } = require("mongoose");
const { ObjectId } = require("../../../db");
const User = require("../../userManagement/models/user");
const Conversation = require("../schema/conversation");
const Messages = require("../schema/messages");

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const createConversation = async (userId1, userId2) => {
    const response = await new Conversation({
        users: [userId1, userId2],
        status: "pending",
    }).save();

    return response._id;
};

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const getPendingConversationRequest = async (userId) => {
    if (!isValidObjectId(userId)) {
        return [];
    }

    const user = await User.findOne({
        _id: ObjectId(userId),
    }).lean();

    let status = ["pending"];
    if (user.role === "student") {
        status.push("rejected");
    }

    const conversations = await Conversation.find({
        users: ObjectId(userId),
        status,
    }).populate({ path: "users", model: "User", select: "-password" });

    return conversations.map((convo) => {
        const { users, _id, status } = convo;
        const otherUserIndex = users[0]._id.toString() === userId ? 1 : 0;

        return {
            conversation_id: _id,
            status,
            name: `${users[otherUserIndex].firstname} ${users[otherUserIndex].lastname}`,
            user_id: users[otherUserIndex]._id,
        };
    });
};

const actionOnConversationRequest = async (conversion_id, status) => {
    if (!isValidObjectId(conversion_id)) {
        return [];
    }

    await Conversation.updateOne(
        {
            _id: ObjectId(conversion_id),
        },
        { status }
    );

    return true;
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
        status: "accepted",
    }).populate({ path: "users", model: "User", select: "-password" });

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
        const otherUserIndex = users[0]._id.toString() === userId ? 1 : 0;

        return {
            conversation_id: _id,
            name: `${users[otherUserIndex].firstname} ${users[otherUserIndex].lastname}`,
            user_id: users[otherUserIndex]._id,
            last_message: lastMessageMap[_id]?.message,
            last_message_on: lastMessageMap[_id]?.audit.created_on,
        };
    });
};

module.exports = { createConversation, getUserConversations, getPendingConversationRequest, actionOnConversationRequest };
