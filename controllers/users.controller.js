const User = require('../models/users.model');
const Transfer = require('../models/transfers.model');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const accountNumber = Math.floor(
    Math.random() * 1000000
  ).toString();

  const amount = 1000;

  const user = await User.create({
    name,
    accountNumber,
    password,
    amount,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user has been created succesfully!!',
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: 'active',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not found',
    });
  }

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.getHistory = catchAsync(async (req, res, next) => {
  const transfers = await Transfer.findAll({
    where: {
      senderUserId: req.params.id,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'This are all the transfers maked by this Id',
    results: transfers.length,
    transfers,
  });
});
