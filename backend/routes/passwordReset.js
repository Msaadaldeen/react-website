import { Router } from 'express';
import User from '../models/User.js';
import bycrypt from 'bcrypt';
import Token from '../models/Token.js';

const router = Router();

router.post('/:userId/:token', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ msg: 'user does not exist' });
    }

    const token = await Token.findOne({
      userId: req.params.userId,
      token: req.params.token,
    });

    if (!token) {
      return res.status(400).json({ msg: 'invalid link or link expired' });
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    await user.save();
    await token.delete();

    res.status(200).json({ msg: 'password reset successful' });
  } catch (err) {
    res.status(500).json({ msg: 'an error occured' });
  }
});

export default router;
