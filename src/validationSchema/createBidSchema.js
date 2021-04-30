const { body, param } = require('express-validator');
module.exports = [
  param('auctionId')
    .isMongoId()
    .withMessage('Please provide valid id in the url'),
  body('name').notEmpty().withMessage('Please provide a name'),
  body('price')
    .notEmpty()
    .withMessage('Please provide a price')
    .bail()
    .isNumeric()
    .withMessage('Number format error for price'),
];
