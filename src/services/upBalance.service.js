const { sequelize } = require('../models/db_connect.js');
const { Op } = require('sequelize');
const { User } = require('../models/user.model.js')
const { makeLogger } = require('../utils/logger.js');

const logger = makeLogger('upBalance_service');

async function updateUserBalanceById(id, amount) {
    try {

        const result = await sequelize.transaction(async (transaction) => {

            const userCount = await User.count({ where: { userId: id }, transaction })

            if (userCount === 0) {
                await transaction.rollback()
                throw 'User not found';
            }

            if (amount > 0) {
                const [updatedBalance] = await User.update(
                    { balance: sequelize.literal(`balance + ${amount}`) },
                    {
                        where: {
                            userId: id,
                        },
                        transaction: transaction
                    })
            } else {
                amount *= -1
                const [updatedBalance] = await User.update(
                    { balance: sequelize.literal(`balance - ${amount}`) },
                    {
                        where: {
                            userId: id,
                            balance: {
                                [Op.gte]: amount
                            }
                        },
                        transaction: transaction
                    })

                if (updatedBalance === 0) {
                    throw 'Insufficient funds';
                }
            }



            return `Player ${id} balance successful update!`;
        })
        logger.info(result)
        return result


    } catch (e) {
        throw e
    }
};

module.exports = { updateUserBalanceById };
