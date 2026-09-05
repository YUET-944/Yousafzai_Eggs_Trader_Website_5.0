import User from './../Model/user.js';
import jwt from 'jsonwebtoken';

// @desc    Log in a user & return a JWT token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email in MySQL
    const user = await User.findOne({ where: { email } });

    // 2. If user doesn't exist, return 401 error
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // 3. Compare password using instance method on the Sequelize User model
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // 4. Generate JWT Token using MySQL primary key `id`
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    // 5. Send back response matching your API envelope specification
    return res.status(200).json({
      success: true,
      data: {
        token: token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          brandId: user.brandId
        }
      }
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Server Error: ' + error.message 
    });
  }
};

// @desc    Get current logged in user details
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  // req.user is automatically populated by your 'protect' middleware
  return res.status(200).json({
    success: true,
    data: req.user
  });
};

// @desc    Stateless logout compatibility endpoint
// @route   POST /api/auth/logout
export const logoutUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};
