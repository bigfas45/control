import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Features } from '../../models/features';

const router = express.Router();

router.put('/api/feature/:conId/', async (req: Request, res: Response) => {
  const { subFeatureRoute, subFeatureName } = req.body;

  const control = await Features.findById(req.params.conId);

  if (!control) {
    throw new NotFoundError();
  }

  if (subFeatureRoute) {
    control.set({ subFeatureRoute });
  }

  if (subFeatureName) {
    control.set({ subFeatureName });
  }

  await control.save();

  res.status(201).send(control);
});

export { router as controlFeautureUpdateRouter };
