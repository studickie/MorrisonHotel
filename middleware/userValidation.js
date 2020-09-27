const { body, validationResult } = require('express-validator');

function userValidationRules () {
    return [
        body('email').isEmail()
            .withMessage('Must be a valid email')
            .normalizeEmail(),
        body('password').isLength({ min: 8, max: 16})
            .withMessage('Must be between 8-16 characters')    
            .trim()
            .escape()
    ];
}

function userValidation (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) req.errors = errors.array();

    return next();
}

module.exports = {
    userValidationRules,
    userValidation
};