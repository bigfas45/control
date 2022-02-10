import mongoose from 'mongoose';

interface StylingAttrs {
 name: string,
 style: {}
   
}

export interface StylingDoc extends mongoose.Document {
  name: string,
  style: {}
    
}

interface DarkModel extends mongoose.Model<StylingDoc> {
  build(attrs: StylingAttrs): StylingDoc;
}

const StylingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    style: {
      type: Object,
      required: true,
    }
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


StylingSchema.statics.build = (attrs: StylingAttrs) => {
  return new Styling(attrs);
};

const Styling = mongoose.model<StylingDoc, DarkModel>('Styling', StylingSchema);

export { Styling };