import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Features } from '../../models/features';

const router = express.Router();

router.get('/api/features/:conID', async (req: Request, res: Response) => {
  const features = await Features.find({ control: req.params.conID });

  if (!features) {
    throw new NotFoundError();
  }

  res.send(features);
});

export { router as featuresListRouter };
