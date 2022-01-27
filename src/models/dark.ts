import mongoose from 'mongoose';

interface DarkAttrs {
 name: string,
  style: {}
   
}

export interface DarkDoc extends mongoose.Document {
  style: {}
    
}

interface DarkModel extends mongoose.Model<DarkDoc> {
  build(attrs: DarkAttrs): DarkDoc;
}

const DarkSchema = new mongoose.Schema(
  {
    styleClass: {
      type: String,
      required: true,
    },
  
  

  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);


DarkSchema.statics.build = (attrs: DarkAttrs) => {
  return new Dark(attrs);
};

const Dark = mongoose.model<DarkDoc, DarkModel>('Dark', DarkSchema);

export { Dark };