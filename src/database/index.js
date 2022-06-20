const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log('Error:', error);
});
