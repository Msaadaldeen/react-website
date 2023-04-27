import { Schema, model } from 'mongoose';
import slugify from 'slugify';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      default() {
        return slugify(this.name, { lower: true });
      },
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.pre('findOneAndUpdate', async function (next) {
  this._update.slug = slugify(this._update.name, { lower: true });
  next();
});

export default model('Category', CategorySchema);
