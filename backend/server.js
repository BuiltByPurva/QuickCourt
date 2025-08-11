// server.js
require('dotenv').config();
const app = require('./app');
require('./src/models'); // initializes DB & models

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
