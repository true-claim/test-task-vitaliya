const { sequelize } = require('./db_connect.js')
const { Model, DataTypes } = require('sequelize');
const { makeLogger } = require('../utils/logger.js');


const userModelConfig = {
    userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    balance: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 10000,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,

    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
}

class User extends Model { }
User.init(userModelConfig, { sequelize, modelName: 'user' })

async function createDefaultUser() {
    try {
        const logger = makeLogger('create_defaul_user');
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');

        const defaultUser = await User.create({
            balance: 10000
        });

        logger.info(`User balacne ${defaultUser.balance} was created.`);
    } catch (e) {
        logger.error('Unable to connect to the database:', e);
    }
}

module.exports = { createDefaultUser, userModelConfig, User }
