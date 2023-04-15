const User = require('../models/users.model');
const Transfer = require('../models/transfers.model');
const catchAsync = require('../utils/catchAsync');

exports.transferAmount = catchAsync(async (req, res, next) => {
  const { amount, accountNumber, senderUserId } = req.body;

  const userReceiver = await User.findOne({
    where: {
      accountNumber,
      status: 'active',
    },
  });

  if (!userReceiver) {
    return res.status(404).json({
      status: 'error',
      message: 'The Receiver user was not found',
    });
  }

  const receiverUserId = userReceiver.id;

  const userSender = await User.findOne({
    where: {
      id: senderUserId,
      status: 'active',
    },
  });

  if (!userSender) {
    return res.status(404).json({
      status: 'error',
      message: 'The Sender user was not found',
    });
  }

  if (amount > userSender.amount) {
    return res.status(401).json({
      status: 'error',
      message: 'The amount is higher than your account',
    });
  }

  if (senderUserId === receiverUserId) {
    return res.status(401).json({
      status: 'error',
      message: 'You cannot send yourself a transfer',
    });
  }

  const newAmountUserSender = userSender.amount - amount;
  const newAmountUserReceiver = userReceiver.amount + amount;

  await userSender.update({ amount: newAmountUserSender });
  await userReceiver.update({ amount: newAmountUserReceiver });

  await Transfer.create({
    amount,
    senderUserId,
    receiverUserId,
  });

  res.status(201).json({
    status: 'success',
    message: 'The transfer was done successfully!',
  });
});
