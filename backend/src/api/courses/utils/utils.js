
const validateCourseModel = (course) => {

}

const requestParamCourseNotFound = (res) => {
    return res.status(400).send({
        message: 'Please check if all the request params are provided.',
        success: false
    })
}

module.exports = {
    validateCourseModel
}