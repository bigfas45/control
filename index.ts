import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('Starting.............. ..........');

  try {
    // const uri ='mongodb+srv://vbox:WguHoZGs8VRUY309@cluster0.zfbt1po.mongodb.net/?retryWrites=true&w=majority';
  const uri = "mongodb+srv://admin:root@stanbic.m5eow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
