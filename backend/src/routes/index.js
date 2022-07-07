const express = require('express');
const router = express.Router();


router.use('/course',require('../api/courses/routes/routes'));
router.use('/messaging',require('../api/messaging/controllers/messaging'));

module.exports = router;