import express, { json, Request, Response } from 'express';
import {
  validateRequest,
  BadRequestError
} from '@vboxdev/common';
import { body } from 'express-validator';
import { Dark } from '../../models/dark';



const router = express.Router();

router.post(
  '/api/dark',
  [
    body('styleClass').not().isEmpty().withMessage('style is required'),
    body('styleText').not().isEmpty().withMessage('style is required'),

  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { styleClass, styleText } = req.body;

    const dark = Dark.build({
      styleClass,
      styleText
    });

    await dark.save();


    res.status(201).send(dark);
  }
);

export { router as darkRouter };