import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Control } from '../../models/control';
const AWS = require('aws-sdk')

interface dataInterface {
  imports:any 
}

// Just a test I made a chnage 


const router = express.Router();

router.get('/api/control', async(req: Request, res: Response) => {


  const control = await Control.find({});

   if (!control) {
     throw new NotFoundError();
   }

   const data: dataInterface = {
    "imports": {}
      }

    data["imports"]["react"] =  "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js"
    data["imports"]["react-dom"] =  "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js"

   for(const {appName, appURL} of control) {
    data["imports"][appName] = appURL
}


data["imports"]["@Stanbic/root-config"] =  "https://sbinternetbanking.web.app/Stanbic-root-config.js"
// data["imports"]["@stanbic/sidebar"] =  "https://sbinternetbankingsidebar.web.app/main.js"
data["imports"]["@stanbic/sidebar"] =  "https://sbinternetbankingsidebar.web.app/main.js"
// data["imports"]["@stanbic/header"] =  "https://sbinternetbankingheader.web.app/main.js"
data["imports"]["@stanbic/header"] =  "http://localhost:9002/main.js"
data["imports"]["@stanbic/mobilemenu"] =  "http://localhost:9001/main.js"



console.log(data)

  // Configure client for use with Spaces
  const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: 'CWI7K3TKYFZIRPEBMWAF',
    secretAccessKey: 'HjgTHoEfq6aVTh0IAD6ZmNo47ysnYK+K2W61d11wK+k',
  });




var params = {
Body: JSON.stringify(data),
Bucket: "contro",
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