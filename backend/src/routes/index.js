const express = require('express');
const router = express.Router();


router.use('/course',require('../api/courses/routes/routes'));
router.use('/conversation',require('../api/messaging/controllers/conversation'));
router.use('/messaging',require('../api/messaging/controllers/messaging'));
router.use('/notifications', require('../api/notification/routes/notification'))


module.exports = router;