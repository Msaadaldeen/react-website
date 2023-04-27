import { Schema, model, Types } from 'mongoose';

const { types } = Schema;

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    categories: [
      {
        type: Types.ObjectId,
        ref: 'Category',
        required: false,
      },
    ],
    price: {
      type: String,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    level: {
      type: String,
      required: false,
    },
    studentsCount: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model('course', CourseSchema);
