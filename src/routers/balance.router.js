const express = require('express');
const { dataUserValidate } = require('../validations/user.validations.js')
const { checkBalance } = require('../middlewares/checkBalance.middlewares.js')
const balanceController = require('../controllers/balance.controller.js')

const balanceRouter = express.Router();
balanceRouter.put('/balance/update', dataUserValidate, checkBalance, balanceController.update)

module.exports = balanceRouter;
