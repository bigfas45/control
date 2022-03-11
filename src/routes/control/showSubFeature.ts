import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Features } from '../../models/subFeatures';

const router = express.Router();

router.get('/api/feature/:subId', async (req: Request, res: Response) => {


  const features = await Features.findById(req.params.subId);

  if (!features) {
    throw new NotFoundError();
  }


  res.send(features);
});

export { router as controlSubShowRouter };