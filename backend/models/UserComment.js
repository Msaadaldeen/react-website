import { Schema, model } from 'mongoose';

const UserCommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Comment', UserCommentSchema);
