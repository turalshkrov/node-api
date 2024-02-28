const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_SERVER_URL)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Connection failed!');
  })

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => { console.log(`server running on port ${PORT}`) });