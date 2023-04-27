import { Schema, model } from 'mongoose';
import Role from './Role.js';

const { Types } = Schema;

let roleId = null;

const defaultRole = async () => {
  const role = await Role.findOne({ name: 'user' });
  roleId = role._id;
};

setTimeout(defaultRole, 3000);

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Types.ObjectId,
      ref: 'Role',
      required: true,
      default: () => roleId,
    },
    courses: [
      {
        type: Types.ObjectId,
        ref: 'Course',
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export default model('User', UserSchema);
