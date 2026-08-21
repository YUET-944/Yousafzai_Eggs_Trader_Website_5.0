import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['SuperAdmin', 'BrandManager'], // Matches spec [cite: 285, 286]
      required: true,
    },
    brandId: {
      type: Number,
      default: null, // SuperAdmin has null, BrandManagers have 0, 1, or 2 
      validate: {
        validator: function (value) {
          // If role is BrandManager, brandId must be specified as 0, 1, or 2 [cite: 45, 66]
          if (this.role === 'BrandManager') {
            return value !== null && [0, 1, 2].includes(value);
          }
          return value === null;
        },
        message: 'BrandManager must have a valid brandId (0, 1, or 2), while SuperAdmin must be null.',
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook: Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;