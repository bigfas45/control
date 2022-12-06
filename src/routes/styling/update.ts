import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Styling } from '../../models/styling';

const router = express.Router();

router.put('/api/style/:styleId', async (req: Request, res: Response) => {
  const { name, style } = req.body;

  const control = await Styling.findById(req.params.styleId);

  if (!control) {
    throw new NotFoundError();
  }

  if (name) {
    control.set({ name });
  }

  if (style) {
    control.set({ style });
  }

  await control.save();

  res.status(201).send(control);
});

export { router as styleUpdateRouter };
