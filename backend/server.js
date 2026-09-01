import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/Config/db.js';


// 1. Import Models
import Job from './src/Model/job.js';
import JobApplication from './src/Model/application.js';
import User from './src/Model/user.js';
import Traceability from './src/Model/traceability.js';
import Product from './src/Model/products.js';
import Cms from './src/Model/cms.js';
import Quote from './src/Model/qoutes.js'; // Adjust filename to match your file (e.g., qoutes.js or quote.js)
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

app.use(cors());
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
    await sequelize.authenticate();
    console.log('📡 MySQL Database connected successfully.');

    await sequelize.sync({ alter: true });
    console.log('⚙️ All models synchronized with MySQL.');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error);
  }
};

startServer();