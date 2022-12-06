import express, { json, Request, Response } from 'express';
import { validateRequest, BadRequestError } from '@vboxdev/common';
import { body } from 'express-validator';
import { Styling } from '../../models/styling';

const router = express.Router();

router.post(
  '/api/style',
  [
    body('name').not().isEmpty().withMessage('name is required'),
    body('style').not().isEmpty().withMessage('style is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, style } = req.body;
    const checkStyle = await Styling.findOne({ name: name.toLowerCase() });

    if (checkStyle) {
      return res.status(400).json({ message: 'Style with this name exists' });
    }

    const newStyle = await Styling.create({
      name: name.toLowerCase(),
      style,
    });

    return res.status(201).send({ newStyle });
  }
);

export { router as darkRouter };
