import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/db.js';

class JobApplication extends Model {}

JobApplication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Links submission to a specific Job listing
    },
    // Mandatory Field 1
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Mandatory Field 2
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    // Mandatory Field 3
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Mandatory Field 4: Resume
    resume: {
      type: DataTypes.STRING, // Cloudinary file URL / path
      allowNull: false,
    },
    // Optional Fields
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    education: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedinUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portfolioUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coverLetter: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'reviewed', 'shortlisted', 'rejected'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'JobApplication',
    tableName: 'job_applications',
    timestamps: true,
  }
);

export default JobApplication;