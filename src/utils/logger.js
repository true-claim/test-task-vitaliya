const { Logger } = require("tslog");
const { appendFileSync } = require('fs');

function makeLogger(name) {
    const logger = new Logger({
        hideLogPositionForProduction: true,
        name: name,
        prettyLogTemplate:
            '{{hh}}:{{MM}}:{{ss}}\t{{logLevelName}}\t{{name}}\t',
    });

    logger.attachTransport((logObj) => {
        appendFileSync('./logs/log.txt', JSON.stringify(logObj) + '\n');
    });

    return logger;
}

module.exports = { makeLogger }


