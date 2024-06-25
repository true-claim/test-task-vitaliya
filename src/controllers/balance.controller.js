const userService = require('../services/upBalance.service.js');
const { makeLogger } = require('../utils/logger.js');

const logger = makeLogger('balance_controller');

const update = async (req, res) => {
    try {
        const { userId, amount } = req.body
        const user = await userService.updateUserBalanceById(userId, amount);
        res.json(user);

    } catch (e) {
        if (e === 'User not found') {
            logger.warn('Error: User not found')
            return res.status(400).send({ error: 'User not found' })
        } else if (e === 'balance <= 0') {
            logger.warn('Error: balance <= 0')
            return res.status(402).send({ error: 'balance <= 0' })
        } else {
            logger.warn('Internal Server Error')
            logger.warn(e)
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
module.exports = { update };
