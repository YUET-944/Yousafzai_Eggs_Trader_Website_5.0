import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/db.js'; // Fixed path to match capitalized Config folder

class Quote extends Model {}

Quote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Not Specified',
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'General Inquiry',
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Buyer / Customer',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weeklyVolume: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Not Specified',
    },
    deliveryLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
  },
  {
    sequelize,
    modelName: 'Quote',
    tableName: 'quotes',
    timestamps: true,
  }
);

export default Quote;