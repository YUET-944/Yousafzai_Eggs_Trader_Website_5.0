import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME || 'your_db_name',     // Database Name
  process.env.DB_USER || 'root',             // MySQL Username
  process.env.DB_PASSWORD || '',// MySQL Password
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries in terminal
  }
);

export default sequelize;