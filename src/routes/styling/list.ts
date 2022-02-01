import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Styling } from '../../models/styling';
const objectToCss = require('convert-to-css');
const fsPromises = require('fs/promises');

const router = express.Router();


async function writeCss(input: any) {
  const result = objectToCss.createCssRule(input)
  const promise = fsPromises.writeFile(`./styles.css`, result);
  return await promise;
};



router.get('/api/dark', async(req: Request, res: Response) => {

  const dark = await Styling.findOne({id: "61f29fd8ab638077881b0814"});

   if (!dark) {
     throw new NotFoundError();
   }

   writeCss(dark.style);
  

 
  res.send( dark);


 

   
 


});

export { router as darkListRouter };