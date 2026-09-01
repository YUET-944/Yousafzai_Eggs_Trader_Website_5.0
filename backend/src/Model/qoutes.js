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
      allowNull: false,
    },
    industry: {
      type: DataTypes.ENUM(
        'Hotel / Restaurant / Café',
        'Bakery / Confectionery',
        'Retail / Supermarket',
        'Food Manufacturer',
        'Hospital / Institution',
        'Other'
      ),
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.ENUM(
        'Commercial Grade A White',
        'Free-Range Brown',
        'Certified Organic',
        'Processing Grade',
        'Mixed / Multiple'
      ),
      allowNull: false,
    },
    weeklyVolume: {
      type: DataTypes.ENUM('Under 50', '50-199', '500–1,999', '2,000+'),
      allowNull: false,
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