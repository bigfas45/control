import mongoose from 'mongoose';




interface FeaturesAttrs {
    subFeatureName: string;
    subFeatureRoute: string;
    control: string
}

export interface FeaturesDoc extends mongoose.Document {
    subFeatureName: string;
    subFeatureRoute: string;
    control: string

}

interface FeaturesModel extends mongoose.Model<FeaturesDoc> {
  build(attrs: FeaturesAttrs): FeaturesDoc;
}

const FeaturesSchema = new mongoose.Schema(
  {
 
      subFeatureRoute: {
        type: String,
       
      },
      subFeatureName: {
        type: String,
       
      },

      control: {
        type: String,
        ref: 'control',
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

const Features = mongoose.model<FeaturesDoc, FeaturesModel>('Features', FeaturesSchema);

export { Features };