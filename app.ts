import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@vboxdev/common';
import { controlRouter } from './src/routes/control/new';
import { controlListRouter } from './src/routes/control/list';
import { controlShowRouter } from './src/routes/control/show';
import { controlUpdateRouter } from './src/routes/control/update';
import { controlDeleteRouter } from './src/routes/control/remove';
import { darkRouter } from './src/routes/styling/new';
import { darkListRouter } from './src/routes/styling/list';
var cors = require('cors');


import cookieSession from 'cookie-session';
const app = express();
app.use(cors());
app.options('*', cors());
app.set('trust proxy', true);
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);


 app.use(controlRouter);
 app.use(controlListRouter);
 app.use(controlShowRouter);
 app.use(controlUpdateRouter);
 app.use(controlDeleteRouter);
 app.use(darkRouter);
 app.use(darkListRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };