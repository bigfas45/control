import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Control } from '../../models/control';

const router = express.Router();

router.get('/apv/control/:conId', async (req: Request, res: Response) => {
  const control = await Control.findById(req.params.conId);

  if (!control) {
    throw new NotFoundError();
  }

  res.send(control);
});

export { router as controlShowRouter };
