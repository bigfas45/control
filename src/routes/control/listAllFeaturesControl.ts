import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Control } from '../../models/control';
import { Features } from '../../models/subFeatures';
const AWS = require('aws-sdk')

interface dataInterface {
  imports:any 
}




const router = express.Router();

router.get('/api/features/:conId', async(req: Request, res: Response) => {


  const features = await Features.find({ control: req.params.conId});

  if (!features) {
    throw new NotFoundError();
  }


  res.send(features);
});

export { router as controlFeaturesListRouter };