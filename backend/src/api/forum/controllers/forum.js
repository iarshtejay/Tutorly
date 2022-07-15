/**
 * @author Harsh Shah
 */
const { createForum, getForums } = require("../services/forum");

const router = require("express").Router();

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return forum
 */
router.post("/", async (req, res) => {
    const { course_id  } = req.body;
    if (course_id === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [course_id]",
        });
    }

    const id = await createForum(course_id);
    res.json({ id });
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return forum
 */
router.get("/", async (req, res) => {
    const userId = req.query.user_id;
    if (userId === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [user_id]",
        });
    }

    res.json(await getForums(userId));
});

module.exports = router;