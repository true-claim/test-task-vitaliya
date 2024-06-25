const { validationResult } = require('express-validator');
const { makeLogger } = require('../utils/logger.js');

const logger = makeLogger('midd_checkBalance');

const checkUser = async (req, res, next) => {
    try {
        const { userId, amount } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Error validation user data!')
            logger.warn({ errors: errors.array() })
            return res.status(415).json({ errors: errors.array() });
        }
        next()
    } catch (e) {
        logger.error(e)
    }
}

module.exports = { checkUser }
