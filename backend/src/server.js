const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';   // bind to all interfaces

app.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});
