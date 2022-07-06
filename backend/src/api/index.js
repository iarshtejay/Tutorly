const express = require('express');
const router = express.Router();


router.use('/course',require('./courses/routes/routes'));
// router.use('/student', require('./students/routes/routes'));
// router.use('/tutor', require('./tutors/routes/routes'));

module.exports = router;