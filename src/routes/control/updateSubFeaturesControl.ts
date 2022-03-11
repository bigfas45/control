import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Features } from '../../models/subFeatures';

const router = express.Router();

router.put(
  '/api/feature/:conId',
  async (req: Request, res: Response) => {

     const { subFeatureRoute, subFeatureName} =
       req.body;



    const features = await Features.findById(req.params.conId);

    if (!features) {
      throw new NotFoundError();
    }


     if (subFeatureName) {
        features.set({ subFeatureName });
     }

     if (subFeatureRoute) {
        features.set({ subFeatureRoute });
     }

    await features.save();

    res.status(201).send(features);
  }
);

export { router as controlSubFeatureUpdateRouter };