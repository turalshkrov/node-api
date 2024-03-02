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
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/categories');
const productRouter = require('./routes/products');
app.use('/api/categories', categoryRouter);
app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => { console.log(`server running on port ${PORT}`) });