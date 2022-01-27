import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Dark } from '../../models/dark';
const objectToCss = require('convert-to-css');

const router = express.Router();

router.get('/api/dark', async(req: Request, res: Response) => {

  const dark = await Dark.find({});

   if (!dark) {
     throw new NotFoundError();
   }

 
   const elements = Object.keys(dark)

   console.log(elements);

   for (let element of elements) {
    //@ts-ignore
    const props = Object.keys(dark[element]);
    for (let prop of props) {
      //@ts-ignore
      console.log(prop, `: ${dark[element][prop]}`)
    }
  }
  

 
  res.send( dark);


 

   
 


});

export { router as darkListRouter };