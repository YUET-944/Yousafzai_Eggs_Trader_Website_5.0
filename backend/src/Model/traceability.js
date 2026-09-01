import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/db.js'; // Adjust path to match your database config location

class Traceability extends Model {}

Traceability.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // One pipeline per brand
    },
    stages: {
      type: DataTypes.JSON, // Stores array of stage objects [{ label, time, order }, ...]
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'Traceability',
    tableName: 'traceabilities',
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

export default Traceability;