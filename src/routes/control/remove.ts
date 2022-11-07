import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Control } from '../../models/control';

const router = express.Router();

router.delete('/api/control/:conId', async (req: Request, res: Response) => {
  const control = await Control.findById(req.params.conId);

  if (!control) {
    throw new NotFoundError();
  }

  await control.remove();
  console.log('delete');

  res.send({});
});

export { router as controlDeleteRouter };
