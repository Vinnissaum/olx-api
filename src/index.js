require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
// const db = require('./database');

mongoose.connect(process.env.DATABASE_URL);

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log('Error:', error);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(`${__dirname}/public`));

app.use(routes);
app.listen(process.env.PORT, () => {
  console.log(`🔥 Server started at ${process.env.BASE}`);
});
