import express, { Request, Response } from 'express';
import {
  requireAuth,
  BadRequestError,
  validateRequest,
  currentUser,
} from '@vboxdev/common';
import _ from 'lodash';
import fs from 'fs';
import { bufferToString } from '../../helpers/bufferToString';
import { body } from 'express-validator';
import { UploadedFile } from 'express-fileupload';
import { ControlAdverts } from '../../models/adverts';

const router = express.Router();

router.post(
  '/api/adverts',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
  ],
  validateRequest,
  async (req: Request | any, res: Response | any) => {
    const { title, description } = req.body;

    if (!req.files?.advertUri) {
      throw new BadRequestError('No image, Please select an image to upload.');
    }

    const mediaUri = bufferToString(req.files!.advertUri);

    const advert = await ControlAdverts.build({
      title,
      description,
      advertUri: mediaUri,
    });

    await advert.save();

    res.status(200).send(advert);
  }
);

router.get(
  '/api/adverts',

  async (req: Request | any, res: Response | any) => {
    const adverts = await ControlAdverts.find({ status: false });

    res.status(200).send(adverts);
  }
);

router.put(
  '/api/adverts/:advertId',

  async (req: Request | any, res: Response | any) => {
    const { title, description, status } = req.body;

    const advert = await ControlAdverts.findById(req.params.advertId);

    if (!advert) {
      throw new BadRequestError('Advert Id does not exist.');
    }

    if (title) {
      advert.set({ title });
    }

    if (description) {
      advert.set({ description });
    }

    if (status) {
      advert.set({ status });
    }

    if (req.files!.advertUri) {
      const advertUri = bufferToString(req.files!.advertUri);

      advert.set({ advertUri });
    }

    res.status(200).send(advert);
  }
);

router.get(
  '/api/adverts/:advertId',

  async (req: Request | any, res: Response | any) => {
    const advert = await ControlAdverts.findById(req.params.advertId);

    if (!advert) {
      throw new BadRequestError('Advert Id does not exist.');
    }

    res.status(200).send(advert);
  }
);

export { router as AdvertsRouter };
