import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const dbName = process.env.DB_NAME || 'yousafzai_eggs_trader_dev';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';

const socketCandidates = [
  process.env.DB_SOCKET,
  '/opt/local/var/run/mysql8/mysqld.sock',
  '/tmp/mysql.sock',
  '/var/run/mysqld/mysqld.sock',
  '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock'
].filter(Boolean);

const activeSocket = socketCandidates.find(p => {
  try {
    return fs.existsSync(p);
  } catch (e) {
    return false;
  }
});

export async function ensureDatabase() {
  if (process.env.DB_AUTO_CREATE === 'false') {
    return;
  }

  const connectionConfig = {
    user: dbUser,
    password: dbPassword,
  };

  if (activeSocket && (!process.env.DB_HOST || process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1')) {
    connectionConfig.socketPath = activeSocket;
  } else {
    connectionConfig.host = dbHost;
    connectionConfig.port = Number(process.env.DB_PORT) || 3306;
  }

  try {
    const connection = await mysql.createConnection(connectionConfig);
    try {
      await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
      );
    } catch (queryErr) {
      console.warn(`[Database] Auto-creation check notice: ${queryErr.message}`);
    } finally {
      await connection.end();
    }
  } catch (connErr) {
    console.warn(`[Database] Pre-connection check notice: ${connErr.message}`);
  }
}

const sequelizeOptions = {
  host: dbHost,
  dialect: 'mysql',
  logging: false,
};

if (activeSocket && (!process.env.DB_HOST || process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1')) {
  sequelizeOptions.dialectOptions = {
    socketPath: activeSocket,
  };
} else if (process.env.DB_PORT) {
  sequelizeOptions.port = Number(process.env.DB_PORT);
}

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  sequelizeOptions
);

export async function ensureJobSchema() {
  try {
    const [columns] = await sequelize.query(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'jobs' AND COLUMN_NAME = 'applicationFormUrl';
    `);

    if (!columns || columns.length === 0) {
      await sequelize.query(`
        ALTER TABLE \`jobs\` ADD COLUMN \`applicationFormUrl\` VARCHAR(2048) NULL DEFAULT NULL;
      `);
      console.log('✅ [Schema Migration] Added applicationFormUrl column to jobs table.');
    } else {
      console.log('ℹ️ [Schema Migration] jobs.applicationFormUrl column verified.');
    }
  } catch (err) {
    console.warn(`⚠️ [Schema Migration] Could not verify jobs.applicationFormUrl: ${err.message}`);
  }
}

export default sequelize;
