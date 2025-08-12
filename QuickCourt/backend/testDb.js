const { sequelize } = require('./src/models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
})();
