import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../Config/db.js'; // Your Sequelize connection instance

class User extends Model {
  // Instance method to compare entered password with hashed password
  async matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      set(value) {
        // Trims white space like Mongoose trim: true
        this.setDataValue('email', value ? value.trim() : value);
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('SuperAdmin', 'BrandManager'),
      allowNull: false,
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: {
        isValidBrandRole(value) {
          if (this.role === 'BrandManager') {
            if (value === null || ![0, 1, 2].includes(value)) {
              throw new Error(
                'BrandManager must have a valid brandId (0, 1, or 2).'
              );
            }
          } else if (this.role === 'SuperAdmin') {
            if (value !== null) {
              throw new Error('SuperAdmin brandId must be null.');
            }
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Automatically manages createdAt and updatedAt
    hooks: {
      // Pre-save equivalent: Hash password before creation
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      // Hash password if updated
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;