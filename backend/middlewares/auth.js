import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Role from '../models/Role.js';

const isAuthenicated = async (req, res, next) => {
  const token = req.headers.token ? req.headers.token.split(' ')[1] : null;

  if (!token) return res.status(401).json({ msg: 'You are not authenticated!' });

  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(id);

    if (!user) return res.status(401).json({ msg: 'You are not authenticated!' });

    req.user = { id: user.id, role: user.role };

    next();
  } catch (err) {
    return res.status(500).json({
      ...err,
      success: false,
      msg: 'Token is not valid!',
    });
  }
};

const isAdmin = async (req, res, next) => {
  isAuthenicated(req, res, async () => {
    const role = await Role.findOne({ name: 'admin' });
    const adminRole = role._id;

    if (String(req.user.role) === String(adminRole)) {
      next();
    } else {
      return res.status(403).json({ msg: 'You are not allowed to do that!' });
    }
  });
};

const isModerator = async (req, res, next) => {
  isAuthenicated(req, res, async () => {
    const role = await Role.findOne({ name: 'moderator' });
    const moderatorRole = role._id;
    if (String(req.user.role) === String(moderatorRole)) {
      next();
    } else {
      return res.status(403).json({ msg: 'You are not allowed to do that!' });
    }
  });
};

export { isAuthenicated, isAdmin, isModerator };
