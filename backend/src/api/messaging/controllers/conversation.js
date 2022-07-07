const Conversation = require("../schema/conversation");
const { createConversation, getUserConversations } = require("../services/conversation");

const router = require("express").Router();

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return conversations
 */
router.get("/user/:id", async (req, res) => {

    const { id: userId } = req.params;

    res.json(await getUserConversations(userId))

});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return Conversation ID
 */
router.post("/", async (req, res) => {
    const { userId1, userId2 } = req.body;
    
    if(userId1 === undefined || userId2 === undefined){
        return res.status(400).json({
            message: "Some required fields are missing: [userId1, userId2]"
        })        
    }

    const id = await createConversation(userId1, userId2);

    return res.json({ id })
});

module.exports = router;
