import express, { Request, Response } from 'express';
import {
  validateRequest,
  BadRequestError,
  NotFoundError,
} from '@vboxdev/common';
import { body } from 'express-validator';
import { Features } from '../../models/features';
import { Control } from '../../models/control';

const router = express.Router();

router.post(
  '/api/control/:controlID',
  [
    body('subFeatureRoute')
      .not()
      .isEmpty()
      .withMessage('subFeatureRoute is required'),
    body('subFeatureName')
      .not()
      .isEmpty()
      .withMessage('subFeatureName is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { subFeatureRoute, subFeatureName } = req.body;

    const subFeatureRouteExist = await Features.findOne({ subFeatureRoute });

    const subFeatureNameExist = await Features.findOne({ subFeatureName });

    const control = await Control.findById(req.params.controlID);

    if (subFeatureRouteExist) {
      throw new BadRequestError('subFeature Route you entered already exist');
    }

    if (subFeatureNameExist) {
      throw new BadRequestError('subFeature Name you entered already exist');
    }

    if (!control) {
      throw new BadRequestError('Control does not exist');
    }

    const features = Features.build({
      subFeatureRoute,
      subFeatureName,
      control: req.params.controlID,
    });

    await features.save();

    res.status(201).send(features);
  }
);

export { router as featureRouter };
