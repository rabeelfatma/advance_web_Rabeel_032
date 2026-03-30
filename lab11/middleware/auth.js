const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = header.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next(); 

  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = auth;