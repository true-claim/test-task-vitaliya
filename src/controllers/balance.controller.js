const userService = require('../services/upBalance.service.js');
const { makeLogger } = require('../utils/logger.js');

const logger = makeLogger('balance_controller');

const update = async (req, res) => {
    try {
        const { userId, amount } = req.body
        const user = await userService.updateUserBalanceById(userId, amount);
        res.send(user);

    } catch (e) {
        if (e === 'User not found') {
            logger.warn('Error: User not found')
            return res.status(400).send({ error: 'User not found' })
        } else if (e === 'Insufficient funds') {
            logger.warn('Error: Insufficient funds')
            return res.status(402).send({ error: 'Insufficient funds' })
        }
        logger.warn('Internal Server Error')
        logger.error(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = { update };
