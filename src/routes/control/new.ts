import express, { Request, Response } from 'express';
import {
  validateRequest,
  BadRequestError
} from '@vboxdev/common';
import { body } from 'express-validator';
import { Control } from '../../models/control';

const router = express.Router();

router.post(
  '/api/control',
  [
    body('appMenuName').not().isEmpty().withMessage('appMenuName is required'),
    body('appName').not().isEmpty().withMessage('appName is required'),
    body('appURL').not().isEmpty().withMessage('appURL is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { appMenuName, appName, appURL } = req.body;

    const appMenuNameExist = await Control.findOne({appMenuName});

    const appNameExist = await Control.findOne({appName});

    const appURLExist = await Control.findOne({appURL});

    if (appMenuNameExist) {
      throw new BadRequestError("App Menu Name you entered already exist")
    }

    if (appNameExist) {
      throw new BadRequestError("App Name you entered already exist")
    }

    if (appURLExist) {
      throw new BadRequestError("App URL you entered already exist")
    }


    const control = Control.build({
      appMenuName,
      appName,
      appURL
    });

    await control.save();

    res.status(201).send(control);
  }
);

export { router as controlRouter };