const { userModelConfig, modelIndex } = require('../user.model.js');

const up = async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', userModelConfig, modelIndex);
};

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('users')
}

module.exports = { up, down }
