const { query, body } = require('express-validator');

const dataUserValidate = [
    body('userId')
        .exists().withMessage('Поле userId не существует')
        .isInt().withMessage('userId должно быть числом')
        .toInt(),
    body('amount')
        .exists().withMessage('Поле amount обязательно')
        .isInt().withMessage('Amount должен быть целым числом')
        .toInt()

    //Допускает числовые целые строки
    //Если захотим десятичнеы суммы то /isNumeric()
]

module.exports = { dataUserValidate };
