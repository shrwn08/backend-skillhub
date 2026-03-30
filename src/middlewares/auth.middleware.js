import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

//Protect: verify JWT and attach user to req
export const protect = async (req, res, next) => {
  let token;
 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
 
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorised – no token' });
  }
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
 
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};
 
// Authorise: restrict to specific roles
// Usage: authorise('admin') or authorise('admin','mentor')

export const authorise = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Role '${req.user.role}' is not allowed to access this route`,
    });
  }
  next();
};
 