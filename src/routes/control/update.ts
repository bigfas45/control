import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Control } from '../../models/control';

const router = express.Router();

router.put('/apv/control/:conId', async (req: Request, res: Response) => {
  const { appName, appURL, appMenuName, appRoute, appIcon, status, order } =
    req.body;

  console.log('appIcon', status);

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

  if (appIcon) {
    control.set({ appIcon });
  }

  if (status) {
    control.set({ status });
  }

  if (order) {
    control.set({ order });
  }

  await control.save();

  res.status(201).send(control);
});

router.put(
  '/apv/control/:order1/:order2',
  async (req: Request, res: Response) => {
    const { order1, order2 } = req.params;
    const getIdFirst = await Control.findOne({ order: order1 });

    const getIdSecond = await Control.findOne({ order: order2 });

    console.log(getIdSecond?.id, getIdFirst?.id);

    const itemsToUpdate = [
      { _id: getIdFirst?.id, order: order2 },
      { _id: getIdSecond?.id, order: order1 },
    ];

    const control = Control.bulkWrite(
      itemsToUpdate.map((item) => ({
        updateOne: {
          filter: { _id: item._id },
          update: { $set: item },
        },
      }))
    );

    res.status(201).send(control);
  }
);

export { router as controlUpdateRouter };
