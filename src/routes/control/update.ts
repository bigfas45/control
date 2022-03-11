import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Control } from '../../models/control';

const router = express.Router();

router.put(
  '/api/control/:conId',
  async (req: Request, res: Response) => {

     const { appName, appURL, appMenuName, appRoute, subFeature, appIcons} =
       req.body;



    const control = await Control.findById(req.params.conId);

    if (!control) {
      throw new NotFoundError();
    }


     if (appName) {
        control.set({ appName });
     }

     if (appURL) {
        control.set({ appURL });
     }

     if (appMenuName) {
        control.set({ appMenuName });
     }

     if (appRoute) {
      control.set({ appRoute });
   }

   
   if (subFeature) {
      control.set({ subFeature });
   }

   if (appIcons) {
      control.set({ appIcons });
   }

    await control.save();

    res.status(201).send(control);
  }
);

export { router as controlUpdateRouter };