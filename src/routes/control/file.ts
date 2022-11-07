import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Control } from '../../models/control';
const path = require('path');
const fs = require('fs');

const router = express.Router();

// testing

router.get('/api/file', async (req: Request, res: Response) => {
  const directoryPath = path.join(__dirname, 'style');

  console.log(directoryPath);

  res.send(directoryPath + '/styles.css');
});

export { router as controlFileRouter };
