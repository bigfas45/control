import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@vboxdev/common';
import { controlRouter } from './routes/control/new';
import { controlListRouter } from './routes/control/list';
import { controlShowRouter } from './routes/control/show';
import { controlUpdateRouter } from './routes/control/update';
import { controlDeleteRouter } from './routes/control/remove';
import { darkRouter } from './routes/styling/new';
import { darkListRouter } from './routes/styling/list';
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