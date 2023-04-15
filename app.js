const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.routes');
const transfersRouter = require('./routes/transfers.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/transfers', transfersRouter);

module.exports = app;
