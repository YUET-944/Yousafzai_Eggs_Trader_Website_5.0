import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/db.js';

class Job extends Model {}

Job.init(
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
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Full-Time', 'Part-Time', 'Contract', 'Remote'),
      defaultValue: 'Full-Time',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'closed'),
      defaultValue: 'active',
    },
    applicationFormUrl: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      defaultValue: null,
      validate: {
        isUrlOrEmpty(value) {
          if (value && String(value).trim() !== '') {
            if (!/^https?:\/\/.+/i.test(String(value).trim())) {
              throw new Error('Google Form URL must be a valid HTTP or HTTPS URL.');
            }
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Job',
    tableName: 'jobs',
    timestamps: true,
  }
);

export default Job;