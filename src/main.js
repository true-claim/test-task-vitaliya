const express = require('express');
const { makeLogger } = require('./utils/logger.js');

const { syncModels } = require('./models/migration.js');
const { createDefaultUser } = require('./models/user.model.js');
const balanceRouter = require('./routers/balance.router.js');


const logger = makeLogger('main');
const port = 3020;
const app = express();

async function main() {
    app.use(express.json());
    app.use('/api', balanceRouter);
    app.listen(port, () => logger.info(`Server run http://localhost:${port}`));

    // await syncModels();
    // await createDefaultUser()
}

main()
