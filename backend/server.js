import dotenv from 'dotenv';
import app from './src/app.js';
import prisma from './src/config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Database connection check
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
