import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Features } from '../../models/features';

const router = express.Router();

router.put('/api/feature/:conId/', async (req: Request, res: Response) => {
  const { appName, appURL, appMenuName, appRoute } = req.body;

  const control = await Features.findById(req.params.conId);

  if (!control) {
    throw new NotFoundError();
  }

  if (appName) {
    control.set({ appName });
  }

  if (appURL) {
    control.set({ appURL });
  }

  if (appMenuName) {
    control.set({ appMenuName });
  }

  if (appRoute) {
    control.set({ appRoute });
  }

  await control.save();

  res.status(201).send(control);
});

export { router as controlFeautureUpdateRouter };
