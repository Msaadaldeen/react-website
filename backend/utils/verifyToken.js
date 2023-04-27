import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token ? req.headers.token.split(' ')[1] : null;

    if (!token) {
      return res.status(401).json('You are not authenticated!!');
    }

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!user) return res.status(401).json('You are not authenticated!!');
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

const verifyTokenAndAuthorization = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id && req.user.isAdmin) {
      next();
    }
    return res.status(403).json({ msg: 'Operation not allowed!' });
  });
};

export { verifyToken, verifyTokenAndAuthorization };
