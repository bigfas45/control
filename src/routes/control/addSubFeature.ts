import express, { Request, Response } from 'express';
import {
  validateRequest,
  BadRequestError,
  NotFoundError
} from '@vboxdev/common';
import { body } from 'express-validator';
import { Features } from '../../models/subFeatures';
import { Control } from '../../models/control';
const AWS = require('aws-sdk')

const router = express.Router();



router.post(
  '/api/control/:conId',
  [
  
    body('subFeatureRoute').not().isEmpty().withMessage('Sub Feature Route is required'),
    body('subFeatureName').not().isEmpty().withMessage('Sub Feature Name is required'),

  
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {  subFeatureRoute, subFeatureName } = req.body;

    const control = await Control.findById(req.params.conId);

    if (!control) {
      throw new NotFoundError();
    }

  
    const feature = Features.build({
        subFeatureRoute,
        subFeatureName,
        control: req.params.conId
    });

    await feature.save();



    res.status(201).send({feature, control});
  }
);

export { router as controlAddSubFeatureRouter };