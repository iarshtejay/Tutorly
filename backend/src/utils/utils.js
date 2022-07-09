const requiredRequestParamsNotFound = (res, params, module) => {
    res.json({
        message: `Following request params not found in module ${module}. \n ${JSON.parse(params)}`,
        success: false 
    })
}

const requiredRequestBodyNotFound = (res, params, module) => {
    res.json({
        message: `Following request body not found in module ${module}. \n ${JSON.parse(params)}`,
        success: false 
    })
}

module.exports = {
    requiredRequestBodyNotFound,
    requiredRequestParamsNotFound
}