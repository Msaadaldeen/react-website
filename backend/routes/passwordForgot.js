import { Router } from 'express';
import Token from '../models/Token.js';
import User from '../models/User.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

const router = Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json('user does not exist');
  }

  let token = await Token.findOne({ userId: user._id });
  if (!token) {
    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    });
    token.save();
  }

  const resetUrl = `http://localhost:3000/reset-password/${user._id}/${token.token}`;

  res.status(200).json(resetUrl);

  // send email
  // TODO
  // const emailSent = await sendEmail(user.email, 'Reset Password', resetUrl);
  // console.log(emailSent);
  // res.status(200).json({ msg: 'reset link sent'});
});

export default router;
