const express = require('express');
const validations = require('./../middlewares/validations.middleware');
const transferController = require('../controllers/transfers.controller');

const router = express.Router();

router.post(
  '/',
  validations.transferValidation,
  transferController.transferAmount
);

module.exports = router;
