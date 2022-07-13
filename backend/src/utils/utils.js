const requiredRequestParamsNotFound = (res, module, params) => {
    res.json({
        message: `Following request params not found in module ${module}.`,
        data: params,
        success: false 
    })
}

const requiredRequestBodyNotFound = (res, module, params) => {
    res.json({
        message: `Following request body not found in module ${module}.`,
        data: params,
        success: false 
    })
}

module.exports = {
    requiredRequestBodyNotFound,
    requiredRequestParamsNotFound
}