const { body } = require('express-validator');
module.exports = [
  body('name').notEmpty().withMessage('Please provide a name'),
  body('startDate')
    .notEmpty()
    .withMessage('Please provide a startdate')
    .bail()
    .isDate()
    .withMessage('Date format error for startDate'),
  body('endDate')
    .notEmpty()
    .withMessage('Please provide a endDate')
    .bail()
    .isDate()
    .withMessage('Date format error for endDate'),
  body('openingPrice')
    .notEmpty()
    .withMessage('Please provide a opening price')
    .bail()
    .isNumeric()
    .withMessage('Number format error for opening price'),
];
