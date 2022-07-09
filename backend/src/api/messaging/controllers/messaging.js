const { getMessages, postMessage } = require("../services/messaging");

const router = require("express").Router();

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return messages
 */
router.get("/:id", async (req, res) => {
    const { id: conversationId } = req.params;

    res.json(await getMessages(conversationId));
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return message Id
 */
router.post("/", async (req, res) => {
    const { sender_user_id, receiver_user_id, conversation_id, message } = req.body;

    if (sender_user_id === undefined || receiver_user_id === undefined || conversation_id === undefined || message === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [sender_user_id, receiver_user_id, conversation_id, message]",
        });
    }

    const id = await postMessage(sender_user_id, receiver_user_id, conversation_id, message);

    return res.json({ id });
});

module.exports = router;