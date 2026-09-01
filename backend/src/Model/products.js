import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/db.js'; // Ensure path to db.js is exact

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    tags: {
      type: DataTypes.JSON, // Stores array of tags e.g. ["fresh", "organic"]
      defaultValue: [],
    },
    icon: {
      type: DataTypes.STRING,
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products', // Explicitly name table in MySQL
    timestamps: true,
  }
);

export default Product;