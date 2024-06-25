const { User } = require('../models/user.model.js')
const { validationResult } = require('express-validator');
const { makeLogger } = require('../utils/logger.js');

const logger = makeLogger('midd_checkBalance');

const checkBalance = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Error validation user data!')
            logger.warn({ errors: errors.array() })
            return res.status(415).json({ errors: errors.array() });
        }

        const { userId, amount } = req.body
        const getBalance = await User.findByPk(userId)

        if (getBalance === null) {
            logger.warn('Error: Not existing user')
            return res.status(402).json({ error: "Not existing user" })
        }

        let balance = getBalance.balance
        balance += amount

        if (balance < 0) {
            logger.warn('Error: Small balance amount')
            return res.status(402).json({ error: "Small balance amount" })
        }
        next()
    } catch (e) {
        logger.error(e)
    }
}

module.exports = { checkBalance }
