import jwt from 'jsonwebtoken';
import User from './../Model/user.js';

// 1. Middleware to protect routes (Checks if the user is logged in via token)
export const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If the header or the token is missing entirely
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided, access denied'
    });
  }

  try {
    // Decode the token using your secret key to get the user ID stored inside it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in MySQL by primary key, excluding the password field
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    // If the user database record doesn't exist anymore
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found, access denied'
      });
    }

    // Everything is perfect! Move to the next function (the controller)
    return next();

  } catch (error) {
    // If the token is fake, modified, or expired
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// 2. Middleware for Role-Based Access Control (RBAC)
// Pass the allowed role name into this helper (e.g., authorize('SuperAdmin'))
export const authorize = (allowedRole) => {
  return (req, res, next) => {
    // If the user is a SuperAdmin, they bypass all checks because they have global access
    if (req.user.role === 'SuperAdmin') {
      return next();
    }

    // If the logged-in user's role matches the role allowed for this route
    if (req.user.role === allowedRole) {
      return next();
    }

    // If the user's role is not authorized for this specific operation
    return res.status(403).json({
      success: false,
      message: `Access denied. Requires [${allowedRole}] authorization privileges.`,
      userRole: req.user.role
    });
  };
};
