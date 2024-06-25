const { sequelize } = require('./db_connect.js');
const { Umzug, SequelizeStorage } = require('umzug');
require('dotenv').config();
const { makeLogger } = require('../utils/logger.js');

const logger = makeLogger('migration');

const umzug = new Umzug({
    migrations: {
        glob: [
            'migrations/*.js',
            {
                cwd: __dirname,
            }
        ]
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
})

const init = async () => {
    try {
        logger.info(`Node ENV: ${process.env.NODE_ENV}`)
        logger.info('Database sync start...')

        if (isTestEnv()) {
            await sequelize.sync({ force: true })
            logger.info('Database clear sync done! (test env)')
        } else {
            logger.info('Skipping sync in production-like environment.')
        }

        if (!isTestEnv()) {
            try {
                logger.info('Database Migrations START...')
                await umzug.up()
                logger.info('Database Migrations completed successfully')
            } catch (e) {
                logger.error(e)
                throw new Error('Database Migrations ERROR')
            }
        }

    } catch (e) {
        logger.error(e)
    }
}

function isTestEnv() {
    return process.env.NODE_ENV === 'test'
}

const syncModels = async () => {
    await init()
}

module.exports = { syncModels }
