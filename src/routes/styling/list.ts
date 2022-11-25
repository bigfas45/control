import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Styling } from '../../models/styling';
const objectToCss = require('convert-to-css');
const fsPromises = require('fs/promises');
const AWS = require('aws-sdk');

const router = express.Router();

async function writeCss(input: any) {
  const result = objectToCss.createCssRule(input);
  const promise = fsPromises.writeFile(`./styles.css`, result);

  // Configure client for use with Spaces
  const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: '55FTPVWKZXK3VVLYORRX',
    secretAccessKey: 'lFelSHpg6Ci6S1svfoPssG1y944WEZJ5sIeXzMo212I',
  });

  var params = {
    Body: result,
    Bucket: 'tets',
    Key: 'styles.css',
    ACL: 'public-read',
    ContentType: 'text/css',
  };

  s3.putObject(params, function (err: any, data: any) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  return await promise;
}

router.get('/apv/dark/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  const dark = await Styling.findById(id);

  if (!dark) {
    throw new NotFoundError();
  }

  writeCss(dark.style);

  res.send(dark);
});

export { router as darkListRouter };
