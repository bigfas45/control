import mongoose from 'mongoose';

interface ControlAttrs {
  appName: string;
  appURL: string;
  appMenuName: string;
  appRoute: string;
  appIcon: string;
  status?: boolean
  order?: number
  type?: []

}

export interface ControlDoc extends mongoose.Document {
  appName: string;
  appURL: string;
  appMenuName: string;
  appRoute: string;
  appIcon: string;
  status?: boolean;
  order?: number
  type?: []



}

interface ControlModel extends mongoose.Model<ControlDoc> {
  build(attrs: ControlAttrs): ControlDoc;
}

const ControlSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      required: true,
      trim: true,
    },
    appURL: {
      type: String,
      required: true,
      trim: true,
    },
    appMenuName: {
      type: String,
      required: true,
      trim: true,
    },
    appRoute: {
      type: String,
      trim: true,
    },
    appIcon: {
      type: String,
      trim: true,
    },
    type: {
      type: [],
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
      trim: true,
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

const Control = mongoose.model<ControlDoc, ControlModel>(
  'Control',
  ControlSchema
);

export { Control };
