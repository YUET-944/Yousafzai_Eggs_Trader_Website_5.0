import jwt from 'jsonwebtoken';
import User from './../Model/user.js';

// 1. Middleware to protect routes (Checks if the user is logged in via token)
export const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token string (e.g., "Bearer eyJhbGciOi..." becomes "eyJhbGciOi...")
      token = req.headers.authorization.split(' ')[1];

      // Decode the token using your secret key to get the user ID stored inside it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in MongoDB by their ID, but leave out the password field for security
      req.user = await User.findById(decoded.id).select('-password');

      // If the user database record doesn't exist anymore
      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: 'User not found, access denied' 
        });
      }

      // Everything is perfect! Move to the next function (the controller)
      return next();

    } catch {
      // If the token is fake, modified, or expired
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }
  }

  // If the header or the token is missing entirely
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token provided, access denied' 
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

    // If their role doesn't match, block them with a 403 Forbidden error
    return res.status(403).json({ 
      success: false, 
      message: 'Forbidden: You do not have permission to access this route' 
    });
  };
};
