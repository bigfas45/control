import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Control } from '../../models/control';
const AWS = require('aws-sdk')

interface dataInterface {
  imports:any 
}




const router = express.Router();

router.get('/api/control', async(req: Request, res: Response) => {


  const control = await Control.find({});

   if (!control) {
     throw new NotFoundError();
   }

   const data: dataInterface = {
    "imports": {}
      }

   for(const {appName, appURL} of control) {

    data["imports"][appName] = appURL
}


data["imports"]["@Stanbic/root-config"] =  "http://localhost:9000/Stanbic-root-config.js"

data["imports"]["@stanbic/sidebar"] =  "http://localhost:9001/main.js"

data["imports"]["@stanbic/header"] =  "http://localhost:9002/main.js"



console.log(data)


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






   
   

  res.send(control);
});

export { router as controlListRouter };