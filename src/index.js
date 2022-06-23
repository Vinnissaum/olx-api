require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const db = require('./database');

const app = express();

db.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(`${__dirname}/public`));

app.use(routes);
app.listen(process.env.PORT, () => {
  console.log(`🔥 Server started at ${process.env.BASE}`);
});
