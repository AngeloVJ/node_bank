const express = require('express');
const validations = require('./../middlewares/validations.middleware');
const userController = require('../controllers/users.controller');
const userMiddleware = require('./../middlewares/user.middlewares');

const router = express.Router();

router.post(
  '/signup',
  validations.createUserValidation,
  userController.signup
);

router.post(
  '/login',
  validations.loginUserValidation,
  userController.login
);

router.get(
  '/:id/history',
  userMiddleware.validExistUser,
  userController.getHistory
);

module.exports = router;
