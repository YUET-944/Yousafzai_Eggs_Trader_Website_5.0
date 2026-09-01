import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/db.js';

class Lead extends Model {}

Lead.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true, // Set to true if forms use the flexible 'data' JSON field
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true, // Set to true if forms use the flexible 'data' JSON field
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'contact', // e.g. 'contact', 'quote', 'inquiry'
    },
    data: {
      type: DataTypes.JSON, // Stores optional nested form payloads
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'new', // Default status for stats counter
    },
  },
  {
    sequelize,
    modelName: 'Lead',
    tableName: 'leads',
    timestamps: true,
  }
);

export default Lead;