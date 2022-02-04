import mongoose from 'mongoose';

interface ControlAttrs {
    appName: string;
    appURL: string;
    appMenuName: string;
    appRoute: string;

}

export interface ControlDoc extends mongoose.Document {
    appName: string;
    appURL: string;
    appMenuName: string;
    appRoute: string;

}

interface ControlModel extends mongoose.Model<ControlDoc> {
  build(attrs: ControlAttrs): ControlDoc;
}

const ControlSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      required: true,
    },
    appURL: {
      type: String,
      required: true,
    },
    appMenuName: {
        type: String,
        required: true,
      },
      appRoute: {
        type: String,
       
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


ControlSchema.statics.build = (attrs: ControlAttrs) => {
  return new Control(attrs);
};

const Control = mongoose.model<ControlDoc, ControlModel>('Control', ControlSchema);

export { Control };