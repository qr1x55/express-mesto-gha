const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/testdb' } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', require('./routes/index'));

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
