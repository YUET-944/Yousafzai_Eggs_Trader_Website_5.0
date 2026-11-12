import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize, { ensureDatabase, ensureJobSchema } from './src/Config/db.js';
import { bootstrapSuperAdmin } from './src/Utils/adminBootstrap.js';

// 1. Import Models
import Job from './src/Model/job.js';
import JobApplication from './src/Model/application.js';
import User from './src/Model/user.js';
import Traceability from './src/Model/traceability.js';
import Product from './src/Model/products.js';
import Cms from './src/Model/cms.js';
import Quote from './src/Model/qoutes.js';
import Lead from './src/Model/lead.js';

Job.hasMany(JobApplication, { foreignKey: 'jobId', onDelete: 'CASCADE' });
JobApplication.belongsTo(Job, { foreignKey: 'jobId' });

// 2. Import Routes
import jobRoutes from './src/Routes/jobroutes.js';
import uploadRoutes from './src/Routes/uploadroutes.js';
import quoteRoutes from './src/Routes/qouteroutes.js';
import cmsRoutes from './src/Routes/cmsroutes.js';
import statsRoutes from './src/Routes/statsroutes.js';
import traceabilityRoutes from './src/Routes/traceabilityroutes.js';
import leadroutes from './src/Routes/leadroutes.js';
import productsroutes from './src/Routes/productsroutes.js';
import authroutes from './src/Routes/Auth.js';

dotenv.config();

const app = express();

// Configure CORS for production and development
const defaultOrigins = [
  'https://yousafzaiagrifoods.com',
  'https://www.yousafzaiagrifoods.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];

const envOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean)
  : [];

const allowedOrigins = [...defaultOrigins, ...envOrigins];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, mobile, or tool requests with no origin
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json());

// Root API Health Check
app.get('/', (req, res) => {
  res.json({ success: true, message: "Yousafzai Group API is running..." });
});

// API Endpoints
app.use('/api/auth', authroutes);
app.use('/api/products', productsroutes);
app.use('/api/leads', leadroutes);
app.use('/api/traceability', traceabilityRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/jobs', jobRoutes);

// Sync MySQL database and start server
const startServer = async () => {
  try {
    await ensureDatabase();
    await sequelize.authenticate();
    console.log('📡 MySQL Database connected successfully.');

    if (process.env.NODE_ENV === 'production') {
      // In production, safely verify that tables exist using CREATE TABLE IF NOT EXISTS
      // Never alters or drops existing production tables or records
      await sequelize.sync();
      console.log('📡 Production database schema verified (IF NOT EXISTS).');
    } else {
      await sequelize.sync({ alter: true });
      console.log('⚙️ All models synchronized with MySQL.');
    }

    // Safely ensure applicationFormUrl column exists without alter/drop
    await ensureJobSchema();

    // Automatically initialize/verify SuperAdmin account on deployment/startup
    await bootstrapSuperAdmin();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error);
  }
};

startServer();

export default app;
