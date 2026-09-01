import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/db.js'; // Adjust path to match your database config location

class Cms extends Model {}

Cms.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sectionKey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Unique index for 'hero', 'about', 'products', etc.
    },
    data: {
      type: DataTypes.JSON, // Replaces mongoose.Schema.Types.Mixed
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cms',
    tableName: 'cms_sections',
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

export default Cms;