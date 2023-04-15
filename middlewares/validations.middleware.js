const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.loginUserValidation = [
  body('accountNumber')
    .notEmpty()
    .withMessage('The accountNumber cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.transferValidation = [
  body('amount').notEmpty().withMessage('The amount cannot be empty'),
  body('accountNumber')
    .notEmpty()
    .withMessage('The accountNumber cannot be empty'),
  body('senderUserId')
    .notEmpty()
    .withMessage('The senderUserId cannot be empty'),
  validFields,
];
