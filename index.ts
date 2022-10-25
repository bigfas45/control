import mongoose from 'mongoose';
import { app } from './app';



const start = async () => {


  console.log('Starting.............. ..........')


   try {
    const uri = "mongodb+srv://vbox:ifeoluwa2016@cluster0.zfbt1po.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

 
  app.listen(2000, () => {
    console.log('Listening on port 2000!!!!!!!!!!');
  });
};

start();