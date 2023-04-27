import User from '../models/User.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { firstname, lastname, username, email, password, passwordConfirm } = req.body;

  // Validation
  if (!email || !validator.isEmail(email)) return res.status(422).json({ msg: 'The email is incorrect!' });

  const emailExp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!emailExp.test(email)) return res.status(422).json({ msg: 'The email is incorrect!' });

  if (password !== passwordConfirm) return res.status(422).json({ msg: 'The passwords do not match!' });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const loginUser = async (req, res) => {
  const { username, password: pwd } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json('User not found!');

    const validPassword = await bcrypt.compare(pwd, user.password);
    if (!validPassword) return res.status(400).json('Wrong password!');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

    const { password, ...others } = user._doc;
    res.status(200).json({ others, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default { registerUser, loginUser };
