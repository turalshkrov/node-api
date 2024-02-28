const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors);

mongoose.connect(process.env.DATABASE_SERVER_URL)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  })


const PORT = process.env.PORT;
app.listen(PORT, () => { console.log(`server running on port ${PORT}`) });