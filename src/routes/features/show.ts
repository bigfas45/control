import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Features } from '../../models/features';

const router = express.Router();

router.get('/api/feature/:features', async (req: Request, res: Response) => {
  const features = await Features.findById(req.params.features);

  if (!features) {
    throw new NotFoundError();
  }

  res.send(features);
});

router.delete('/api/feature/:features', async (req: Request, res: Response) => {
  const features = await Features.findById(req.params.features);

  if (!features) {
    throw new NotFoundError();
  }

  await features.remove();

  res.send(features);
});

export { router as featuresShowRouter };
