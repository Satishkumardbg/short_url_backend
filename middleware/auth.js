import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Store this in an environment variable in a real application

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
// console.log("authHeader",authHeader)
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
     
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Attach user info to the request
    next();
  });
};

export default authenticateToken;