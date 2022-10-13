import mongoose from 'mongoose';

interface FeaturesAttrs {
  subFeatureRoute: string;
  subFeatureName: string;
  control: string;
}

export interface FeaturesDoc extends mongoose.Document {
  subFeatureRoute: string;
  subFeatureName: string;
  control: string;
}

interface FeaturesModel extends mongoose.Model<FeaturesDoc> {
  build(attrs: FeaturesAttrs): FeaturesDoc;
}

const FeaturesSchema = new mongoose.Schema(
  {
    subFeatureRoute: {
      type: String,
      required: true,
    },
    subFeatureName: {
      type: String,
      required: true,
    },
    control: {
      type: mongoose.Types.ObjectId,
      ref: 'Control',
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

FeaturesSchema.statics.build = (attrs: FeaturesAttrs) => {
  return new Features(attrs);
};

const Features = mongoose.model<FeaturesDoc, FeaturesModel>(
  'Features',
  FeaturesSchema
);

export { Features };
