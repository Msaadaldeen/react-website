import User from '../models/User.js';
import Post from '../models/Post.js';
import Role from '../models/Role.js';
import Course from '../models/Course.js';

import bcrypt from 'bcrypt';

export const setModerator = async (req, res) => {
  const id = req.params.id;
  try {
    const findUser = await User.findById(id);
    const role = findUser.role;

    const findRole = await Role.findOne({ name: 'moderator' });
    const moderatorRole = findRole._id;

    const setRole = await findUser.update({ role: moderatorRole });

    return res.status(200).json(setRole);
  } catch (err) {
    return res.status(422).json(err);
  }
};

export const setAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const findUser = await User.findById(id);
    const role = findUser.role;

    const findRole = await Role.findOne({ name: 'admin' });
    const adminRole = findRole._id;

    const setRole = await findUser.update({ role: adminRole });

    return res.status(200).json(setRole);
  } catch (err) {
    return res.status(422).json(err);
  }
};

export const addCourseToUser = async (req, res) => {
  const id = req.params.id;
  const courseId = req.body.courseId;

  try {
    const findUser = await User.findById(id);
    const courses = findUser.courses;

    const addCourse = await findUser.update({ courses: [courseId, ...courses] });

    return res.status(200).json(addCourse);
  } catch (err) {
    return res.status(422).json(err);
  }
};

export const getUserCourses = async (req, res) => {
  const id = req.params.id;

  try {
    const findUser = await User.findById(id);
    const courses = findUser.courses;

    const findCourses = await Course.find({ _id: { $in: courses } });

    return res.status(200).json(findCourses);
  } catch (err) {
    return res.status(422).json(err);
  }
};

export const getUserPosts = async (req, res) => {
  const id = req.params.id;

  try {
    const findUser = await User.findById(id);
    const postsUserId = await Post.find({ postedBy: findUser._id });

    const findPosts = await Post.find({ _id: { $in: postsUserId } });
    return res.status(200).json(findPosts);
  } catch (err) {
    return res.status(422).json(err);
  }
};

export const getUsersPosts = async (req, res) => {
  const id = req.params.id;

  try {
    const findUsers = await User.find({ _id: { $ne: id } });

    const findPosts = await Post.find({ postedBy: { $in: findUsers } })
      .populate({ path: 'postedBy', select: ['firstname', 'lastname', 'username', 'email'] })
      .exec();

    return res.status(200).json(findPosts);
  } catch (err) {
    return res.status(422).json(err);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(Number(process.env.BYCRYPT_SALT));
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (req.body.userId === id) {
    try {
      const user = await User.findById(id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(id);
        return res.status(200).json('User has been deleted...');
      } catch (err) {
        return res.status(500).json(err);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(401).json('You can delete only your account!');
  }
};

export const readUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const { ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const readAllUsers = async (req, res) => {
  try {
    let users;

    users = await User.find().populate('role').exec();

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default {
  updateUser,
  deleteUser,
  readUser,
  readAllUsers,
  getUserCourses,
  addCourseToUser,
};
