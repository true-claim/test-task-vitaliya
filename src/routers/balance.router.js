const express = require('express');
const { dataUserValidate } = require('../validations/user.validations.js')
const { checkUser } = require('../middlewares/checkUser.middlewares.js')
const balanceController = require('../controllers/balance.controller.js')

const balanceRouter = express.Router();
balanceRouter.put('/balance/update', dataUserValidate, checkUser, balanceController.update)

module.exports = balanceRouter;
