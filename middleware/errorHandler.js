const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging
    const statusCode = res.statusCode ? res.statusCode : constants.SERVER_ERROR;

    switch (statusCode) {
        case constants.VALIDATION_ERRORS:
            res.status(constants.VALIDATION_ERRORS).json({
                message: 'Validation Error',
                details: err.message || 'Invalid data provided.'
            });
            break;
        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({
                message: 'Not Found'
            });
            break;
        case constants.SERVER_ERROR:
            res.status(constants.SERVER_ERROR).json({
                message: 'Internal Server Error',
                details: err.message // Include error message
            });
            break;
        case constants.FORBIDDEN:
            res.status(constants.FORBIDDEN).json({
                message: 'Forbidden'
            });
            break;     
        case constants.UNAUTHORIZED:
            res.status(constants.UNAUTHORIZED).json({
                message: 'Unauthorized'
            });
            break; 
        default:
            res.status(constants.SERVER_ERROR).json({
                message: 'An unexpected error occurred',
                details: err.message // Include error message
            });
    }
};

module.exports = { errorHandler };
