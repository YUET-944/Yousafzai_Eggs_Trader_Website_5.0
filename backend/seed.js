import dotenv from 'dotenv';
import sequelize, { ensureDatabase } from './src/Config/db.js';
import { bootstrapSuperAdmin } from './src/Utils/adminBootstrap.js';

dotenv.config();

try {
  await ensureDatabase();
  await sequelize.authenticate();
  await bootstrapSuperAdmin({ exitOnError: true });
} catch (error) {
  console.error(`Admin bootstrap failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await sequelize.close().catch(() => {});
}
