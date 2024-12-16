const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    console.log('Decoded User:', user); // Log the decoded token payload
    req.user = user; // Attach the decoded user to the request
    next();
  });
};

const authorizeRoles = (...roles) => (req, res, next) => {
  console.log('User Role:', req.user.role); // Log the user's role
  console.log('Allowed Roles:', roles);    // Log the allowed roles
  
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authenticateJWT, authorizeRoles };
