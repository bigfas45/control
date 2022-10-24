import mongoose from 'mongoose';

interface ControlAdvertsAttrs {
  title: string;
  description: string;
  status?: boolean;
  advertUri: string;
}

export interface ControlAdvertsDoc extends mongoose.Document {
  title: string;
  description: string;
  status?: boolean;
  advertUri: string;
}

interface ControlAdvertsModel extends mongoose.Model<ControlAdvertsDoc> {
  build(attrs: ControlAdvertsAttrs): ControlAdvertsDoc;
}

const ControlAdvertsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    advertUri: {
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

ControlAdvertsSchema.statics.build = (attrs: ControlAdvertsAttrs) => {
  return new ControlAdverts(attrs);
};

const ControlAdverts = mongoose.model<ControlAdvertsDoc, ControlAdvertsModel>(
  'ControlAdverts',
  ControlAdvertsSchema
);

export { ControlAdverts };
