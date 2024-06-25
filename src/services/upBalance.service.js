const { sequelize } = require('../models/db_connect.js');
const { User } = require('../models/user.model.js')
const { makeLogger } = require('../utils/logger.js');

const logger = makeLogger('upBalance_service');

async function updateUserBalanceById(id, amount) {
    try {

        const result = await sequelize.transaction(async (transaction) => {
            const user = await User.findByPk(id, { transaction })

            user.balance += amount
            await user.save({ transaction });

            return user;
        })
        logger.info('Successful update balance: ', { player: result.userId, newBalance: result.balance })
        return { player: result.userId, newBalance: result.balance }

    } catch (e) {
        console.log(e)
        throw e
    }
};

module.exports = { updateUserBalanceById };
