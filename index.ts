import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  console.log('Starting.............. ..........');

  try {
    // const uri = "mongodb+srv://admin:root@stanbic.m5eow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const uri = 'mongodb://localhost:27017/control';

    await mongoose.connect(uri);

    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!!!');
  });
};

start();
