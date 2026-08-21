import User from './../Model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Log in a user & return a JWT token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by username
    const user = await User.findOne({ email });

    // 2. If user doesn't exist, return 401 error
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // 3. Compare password input with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // 4. Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    // 5. Send back response matching your API envelope specification
    return res.status(200).json({
      success: true,
      data: {
        token: token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          brandId: user.brandId
        }
      }
    });

  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Unable to sign in right now.'
    });
  }
};

// @desc    Get current logged in user details
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  // req.user is automatically populated by our 'protect' middleware
  return res.status(200).json({
    success: true,
    data: req.user
  });
};

// @desc    Stateless JWT logout acknowledgement
// @route   POST /api/auth/logout
export const logoutUser = async (req, res) => {
  return res.status(204).send();
};
