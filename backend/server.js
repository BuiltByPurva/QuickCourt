//to be implemented in this 
const http = require('http');
const app = require('./app');
const { sequelize } = require('./src/models');
require('dotenv').config();

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: { origin: "*" }
});

// attach io to app so controllers can access it
app.set('io', io);

io.on('connection', socket => {
  console.log('socket connected', socket.id);
  socket.on('disconnect', () => console.log('socket disconnected', socket.id));
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB OK');
    // Quick dev convenience: sync models (use migrations in production)
    await sequelize.sync({ alter: true });
    server.listen(port, () => console.log(`Server running on ${port}`));
  } catch (err) {
    console.error('Failed to start', err);
  }
})();
