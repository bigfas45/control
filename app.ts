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
import { controlFileRouter } from './src/routes/control/file';
import { IndexStyleRouter } from './src/routes/styling/index';
import { featureRouter } from './src/routes/features/new';
import { featuresListRouter } from './src/routes/features/index';
import { featuresShowRouter } from './src/routes/features/show';
import {controlFeautureUpdateRouter } from './src/routes/features/update';
import {AdvertsRouter} from './src/routes/control/adverts'

var cors = require('cors');

var fileupload = require('express-fileupload');



import cookieSession from 'cookie-session';
const app = express();
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: "GET, PUT, DELETE, POST"
}
app.use(cors(corsOptions));
app.options('*', cors());
app.set('trust proxy', true);
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(fileupload());


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
 app.use(controlFileRouter);
 app.use(IndexStyleRouter);
 app.use(featureRouter);
 app.use(featuresListRouter);
 app.use(featuresShowRouter);
 app.use(controlFeautureUpdateRouter);
 app.use(AdvertsRouter)

app.all('*', async (req, res, next) => {

  throw new NotFoundError();
  
});

app.use(errorHandler);

export { app };
