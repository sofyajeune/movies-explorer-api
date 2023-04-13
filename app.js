// Импортируем модули
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');// Защита от XSS attack
const { errors } = require('celebrate');
const handleErrors = require('./middlewares/handleErrors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DBMONGO } = require('./config');
const limiter = require('./middlewares/limiter');

// Создаем приложение
const app = express();

app.use(cors());

app.use(helmet());

// Подключаемся к монго по адресу (mestodb — имя базы данных, которая будет создана.)
mongoose.set('strictQuery', true);
mongoose
  .connect(DBMONGO)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected.');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(limiter); // Активация
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
