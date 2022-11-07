import mongoose from 'mongoose';
import { app } from './app';



const start = async () => {


  console.log('Starting.............. ..........')


   try {
    const uri = "mongodb+srv://admin:root@stanbic.m5eow.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

 
  app.listen(3000, () => {
    console.log('Listening on port 2000!!!!!!!!!!');
  });
};

start();