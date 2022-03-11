import express, { Request, Response } from 'express';
import {
  validateRequest,
  BadRequestError,
  NotFoundError
} from '@vboxdev/common';
import { body } from 'express-validator';
import { Control } from '../../models/control';
const AWS = require('aws-sdk')

const router = express.Router();

interface dataInterface {
  imports:any 
}

router.post(
  '/api/control',
  [
    body('appMenuName').not().isEmpty().withMessage('appMenuName is required'),
    body('appName').not().isEmpty().withMessage('appName is required'),
    body('appURL').not().isEmpty().withMessage('appURL is required'),
  
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { appMenuName, appName, appURL,appRoute,  appIcons } = req.body;

    const appMenuNameExist = await Control.findOne({appMenuName});

    const appNameExist = await Control.findOne({appName});

    const appURLExist = await Control.findOne({appURL});

     const appRouteExist = await Control.findOne({appRoute});
    

    if (appMenuNameExist) {
      throw new BadRequestError("App Menu Name you entered already exist")
    }

    if (appNameExist) {
      throw new BadRequestError("App Name you entered already exist")
    }

    if (appURLExist) {
      throw new BadRequestError("App URL you entered already exist")
    }

    if (appRouteExist) {
      throw new BadRequestError("App Route Exist you entered already exist")
    }


    const control = Control.build({
      appMenuName,
      appName,
      appURL,
      appRoute,
      appIcons,
  
    });

    await control.save();



    const controlS = await Control.find({});

   if (!controlS) {
     throw new NotFoundError();
   }

   const data: dataInterface = {
    "imports": {}
      }

      data["imports"]["react"] =  "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js"
    data["imports"]["react-dom"] =  "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js"


   for(const {appName, appURL} of controlS) {

    data["imports"][appName] = appURL
}

data["imports"]["@Stanbic/root-config"] =  "http://localhost:9000/Stanbic-root-config.js"
data["imports"]["@stanbic/sidebar"] =  "http://localhost:9001/main.js"
data["imports"]["@stanbic/header"] =  "http://localhost:9002/main.js"

console




  // Configure client for use with Spaces
  const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
  const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: '55FTPVWKZXK3VVLYORRX',
      secretAccessKey: 'lFelSHpg6Ci6S1svfoPssG1y944WEZJ5sIeXzMo212I'
  });




var params = {
  Body: JSON.stringify(data),
  Bucket: "tets",
  Key: "importmap.json",
  ACL: "public-read",
  ContentType: "application/json"
};






s3.putObject(params, function(err: any, data: any) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});








    res.status(201).send(control);
  }
);

export { router as controlRouter };