import { Schema, model } from 'mongoose';

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Role', RoleSchema);
