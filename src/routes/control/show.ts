import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Control } from '../../models/control';
import { Features } from '../../models/subFeatures';

const router = express.Router();

router.get('/api/control/:conId', async (req: Request, res: Response) => {


  const control = await Control.findById(req.params.conId);

  if (!control) {
    throw new NotFoundError();
  }


  const features = await Features.find({control: req.params.conId});




  res.send({control, features});
});

export { router as controlShowRouter };