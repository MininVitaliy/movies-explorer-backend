const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { limiter } = require('./constants');
const { handlerErrors } = require('./middlewares/handlerErrors');
const routes = require('./routes/routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.use(express.json());
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT);
});
